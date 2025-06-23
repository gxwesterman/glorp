import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { Chat, Message } from "@/lib/types";

function addMessage(text: string, type: string, chatId: string, answerId?: string, status?: string) {
  db.transact(
    db.tx.messages[answerId || id()].update({
      chatId,
      text,
      type,
      status,
    }).link({ chats: chatId }),
  );
}

function updateMessage(id: string, text: string, status: string) {
  db.transact(
    db.tx.messages[id].update({
      text,
      status,
    }),
  );
}

function finishAnswer(id: string) {
  db.transact(
    db.tx.messages[id].update({
      status: "done"
    }),
  );
}

type ChatProviderState = {
  chats: Chat[],
  messages: Message[],
  deleteChat: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, chat: Chat) => void,
  startStream: (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => Promise<void>
}

const initialState: ChatProviderState = {
  chats: [],
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
  const chats = data?.chats;
  const chat = chats?.find((chat) => chat.urlId === pageChatId);
  const messages = chat ? chat.messages : [];
  const [wasChatPresent, setWasChatPresent] = useState<boolean>(false);

  const deleteChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    chat: Chat
  ) => {
    e.stopPropagation();
    db.transact(db.tx.chats[chat.id].delete());
    db.transact(chat.messages.map((m) => db.tx.messages[m.id].delete()));
  };

  const startStream = async (chatId: string, input: string, messages: { [x: string]: string; id: string; }[]) => {
    const newAnswerId = id();
    addMessage(input, 'question', chatId);
    addMessage('', 'answer', chatId, newAnswerId, 'pending');

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
            updateMessage(newAnswerId, result, "streaming");
          }
          finishAnswer(newAnswerId)
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }

  useEffect(() => {
    if (chat) {
      setWasChatPresent(true);
    }
    if (wasChatPresent && !chat && pageChatId !== 'chat') {
      window.history.pushState({}, "", "/chat");
    }
  }, [chat, pageChatId, wasChatPresent]);

  if (!chats) return;

  return (
    <ChatProviderContext.Provider {...props} value={{ startStream, deleteChat, chats, messages }}>
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
