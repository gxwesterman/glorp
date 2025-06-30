'use client'

import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { Chat, Message } from "@/lib/types";
import { addMessage, deleteChat } from "@/lib/chat-utils";

const defaultChat = {
  id: "chat",
  urlId: "chat",
  title: "Chat",
  messages: [],
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
  chats: Chat[],
  chat: Chat,
  messages: Message[],
  deleteChat: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, chat: Chat) => void,
  startStream: (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => Promise<void>
}

const initialState: ChatProviderState = {
  chats: [],
  chat: defaultChat,
  messages: [],
  deleteChat: () => undefined,
  startStream: async () => undefined,
}

const ChatProviderContext = createContext<ChatProviderState>(initialState)

export function ChatProvider({
  children,
  ...props
}: { children: React.ReactNode }) {

  const [sessionId, setSessionId] = useState('');
  const pathname = usePathname();
  const pageChatId = pathname.split("/").pop() || "";

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('g6_session='));
    const extractedUserId = userIdCookie ? userIdCookie.split('=')[1].trim() : '';
    setSessionId(extractedUserId);
  }, [pathname])

  const chatsQuery = {
    chats: {
      $: {
        where: {
          sessionId: sessionId
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

  if (!data || (pageChatId !== 'chat' && chat.id === "chat")) return;

  return (
    <ChatProviderContext.Provider {...props} value={{ startStream, deleteChat, chat, chats, messages }}>
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
