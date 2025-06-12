import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { createContext, useContext, useEffect, useState } from "react"

function addMessage(text: string, type: string, chatId: string, answerId?: string) {
  db.transact(
    db.tx.messages[answerId || id()].update({
      chatId,
      text,
      type,
    }).link({ chats: chatId }),
  );
}

function updateMessage(id: string, content: string) {
  db.transact(
    db.tx.messages[id].update({
      text: content
    }),
  );
}

type ChatProviderState = {
  startStream: (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => Promise<void>
}

const initialState: ChatProviderState = {
  startStream: async () => undefined,
}

const ChatProviderContext = createContext<ChatProviderState>(initialState)

export function ChatProvider({
  children,
  ...props
}: { children: React.ReactNode }) {
  
  const startStream = async (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => {
    const newAnswerId = id();
    addMessage(input, 'question', chatId);
    addMessage('. . .', 'answer', chatId, newAnswerId);
    try {
        const response = await fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input,
            messages: messages,
            chatId: chatId,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to get AI response');
        }

        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let result = '';

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            result += decoder.decode(value, { stream: true });
            updateMessage(newAnswerId, result);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <ChatProviderContext.Provider {...props} value={{ startStream }}>
      {children}
    </ChatProviderContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatProviderContext)

  if (context === undefined)
    throw new Error("useChat must be used within a ChatProvider")

  return context
}
