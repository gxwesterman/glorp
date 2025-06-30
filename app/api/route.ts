import { GoogleGenAI } from "@google/genai";
import { admin_db as db } from "@/lib/instant";
import { marked, Tokens } from "marked";
import { highlight } from "sugar-high";

const renderer = {
  code(tokens: Tokens.Code) {
    const text = tokens.text;
    return (
      `<code data-lang="${tokens.lang ?? 'code'} data-code="${encodeURIComponent(text)}"><pre>${highlight(text)}</pre></code>`
    )
  }
}

marked.use({ renderer });

async function updateMessage(id: string, text: string, status: string) {
  const html = marked.parse(text);
  await db.transact(
    db.tx.messages[id].update({
      text,
      html,
      status,
    }),
  );
}

async function finishAnswer(id: string) {
  await db.transact(
    db.tx.messages[id].update({
      status: "done"
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
  await finishAnswer(answerId);
  return Response.json({ message: 'Done' })
}