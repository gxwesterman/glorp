import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { message, messages } = await req.json();

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
    
  const result = await chat.sendMessageStream({ message: message });
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result) {
        controller.enqueue(chunk.text);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  });
}