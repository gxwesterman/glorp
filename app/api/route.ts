import { GoogleGenAI } from "@google/genai";
import { admin_db as db } from "@/lib/instant";
import { marked, Tokens } from "marked";
import { highlight } from "sugar-high";

function createRenderer(status: string) {
  return {
    code(tokens: Tokens.Code) {
      const text = tokens.text;
      const language = tokens.lang?.trim();
      if (language) {
        return `
          <code
            data-status="${status}"
            data-lang="${language}"
            data-code="${encodeURIComponent(text)}"
          >
            <pre>${highlight(text)}</pre>
          </code>`;
      }
      return `
        <code>
          <pre>${text}</pre>
        </code>`;
    }
  };
}

async function updateMessage(id: string, text: string, status: string) {
  const renderer = createRenderer(status);
  marked.use({ renderer });
  const html = marked.parse(text);
  await db.transact(
    db.tx.messages[id].update({
      text,
      html,
      status,
    }),
  );
}

export async function POST(req: Request) {
  const { answerId, message, messages } = await req.json();

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''} );
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
  await updateMessage(answerId, response, "done");
  return Response.json({ message: 'Done' })
}