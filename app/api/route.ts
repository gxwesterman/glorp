import { ai } from "@/lib/ai";
import { admin_db as db } from "@/lib/instant";
import { marked, Renderer, Tokens } from "marked";
import { highlight } from "sugar-high";

const CHUNK_SEPARATOR = "<!-- __BLOCK__ -->";

function createRenderer(status: string) {
  const base = new Renderer();
  
  base.code = (tokens: Tokens.Code) => {
    const text = tokens.text;
    const language = tokens.lang?.trim();
    if (language) {
      return `
        <code
          data-status="${status}"
          data-lang="${language}"
          data-code="${encodeURIComponent(text)}"
        >
          <div class="code-header"></div>
          <div class="code-copy"></div>
          <pre>${highlight(text)}</pre>
        </code>`;
    }
    return `
      <code>
        <pre>${text}</pre>
      </code>`;
  }
  return base;
}

function parse(markdown: string, status: string) {
  const tokens = marked.lexer(markdown);
  const renderer = createRenderer(status);
  return tokens.map(token => marked.parser([token], { renderer })).join(CHUNK_SEPARATOR) + CHUNK_SEPARATOR;
}

async function updateMessage(id: string, text: string, status: string) {
  const html = parse(text, status);
  await db.transact(
    db.tx.messages[id].update({
      text,
      html,
      status,
    }),
  );
}

async function editChat(id: string, title: string) {
  await db.transact(
    db.tx.chats[id].update({
        title,
      }
    )
  );
}

export async function POST(req: Request) {
  const { answerId, chatId, message, messages } = await req.json();

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: messages.map((message: { type: string, text: string }) => {
      return {
        role: message.type === 'question' ? 'user' : 'model',
        parts: [{ text: message.text }]
      }
    })
  })
    
  const stream = await chat.sendMessageStream({ message: message });
  let response = '';
  for await (const chunk of stream) {
    if (chunk.text) {
      response += chunk.text;
      await updateMessage(answerId, response, "streaming");
    }
  }

  const title = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: response,
    config: {
      systemInstruction: "Give me a title no more than 3 words that summarizes this content. Do not add any punctuation.",
    },
  });

  await updateMessage(answerId, response, "done");
  await editChat(chatId, title.text ?? "");

  return Response.json({ message: 'Done' })
}