import { GoogleGenAI } from "@google/genai";
import { admin_db as db } from "@/lib/instant";

async function updateMessage(id: string, text: string, status: string) {
  await db.transact(
    db.tx.messages[id].update({
      text,
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