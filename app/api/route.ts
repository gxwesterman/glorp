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
          <div class="code-header">${language}</div>
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
  const chatQuery = {
    chats: {
      $: {
        where: {
          urlId: chatId
        }
      },
    },
  };
  const data = await db.query(chatQuery);
  const history = messages.map((message: { type: string, text: string }) =>{
    return {
      role: message.type === 'question' ? 'user' : 'model',
      parts: [{ text: message.text }]
    }
  });

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: history,
  });
    
  const stream = await chat.sendMessageStream({ message: message });
  let response = '';
  let buffer = '';
  const BUFFER_LIMIT = 30;

  for await (const chunk of stream) {
    if (chunk.text) {
      for (const char of chunk.text) {
        response += char;
        buffer += char;

        if (buffer.length >= BUFFER_LIMIT) {
          await updateMessage(answerId, response, "streaming");
          buffer = '';
        }
      }
    }
  }

  if (buffer.length > 0) {
    await updateMessage(answerId, response, "streaming");
  }

  await updateMessage(answerId, response, "done");
  if (!data.chats[0].edited) {
    const title = await chat.sendMessage({ message: "Give me a title no more than 3 words that summarizes this content. Do not add any punctuation." });
    await editChat(chatId, title.text ?? "");
  }

  return Response.json({ message: 'Done' })
}