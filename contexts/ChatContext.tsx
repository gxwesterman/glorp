'use client'

import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { Chat, Message } from "@/lib/types";
import { addMessage } from "@/lib/chat-utils";

const defaultChat = {
  id: "chat",
  urlId: "chat",
  title: "Glorp",
  messages: [],
  edited: false,
}

const startStream = async (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => {
  const newAnswerId = id();
  addMessage(input, '', 'question', chatId);
  addMessage('', '', 'answer', chatId, newAnswerId, 'pending');

  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: chatId,
        answerId: newAnswerId,
        message: input,
        messages: messages,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

type ChatProviderState = {
  user: { id: string, email: string }
  chats: Chat[],
  chat: Chat,
  messages: Message[],
  startStream: (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => Promise<void>
}

const initialState: ChatProviderState = {
  user: { id: '', email: '' },
  chats: [],
  chat: defaultChat,
  messages: [],
  startStream: async () => undefined,
}

const ChatProviderContext = createContext<ChatProviderState>(initialState)

export function ChatProvider({
  children,
  ...props
}: { children: React.ReactNode }) {

  const { user, isLoading, error } = db.useAuth();
  const pathname = usePathname();
  const pageChatId = pathname.split("/").pop() || "";

  const chatsQuery = {
    chats: {
      $: {
        where: {
          userId: user?.id ?? "",
        }
      },
      messages: {},
    },
  };

  const { data } = db.useQuery(chatsQuery);
  const chats = data?.chats ?? [];
  const chat = chats?.find((chat) => chat.urlId === pageChatId) ?? defaultChat;
  const messages = chat ? chat.messages : [];
  const [wasChatPresent, setWasChatPresent] = useState<boolean>(false);

  useEffect(() => {
    if (chat && chat.id !== "chat") {
      setWasChatPresent(true);
    }
    if (wasChatPresent && pageChatId !== "chat" && chat.id === "chat") {
      window.history.pushState({}, "", "/chat");
    }
  }, [chat, pageChatId, wasChatPresent]);

  if (isLoading || error || !user) return;
  if (!data || (pageChatId !== 'chat' && chat.id === "chat")) return;

  return (
    <ChatProviderContext.Provider {...props} value={{ user, startStream, chat, chats, messages }}>
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
