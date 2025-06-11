"use client";

import { db } from "@/lib/instant";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/Chat";
import ChatForm from "@/components/ChatForm";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout() {

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

  const { isLoading, error, data } = db.useQuery(chatsQuery);
  if (isLoading) return <div></div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const chat = data.chats.find((chat) => chat.urlId === pageChatId);
  const messages = chat ? chat.messages : [];
  
  return (
    <SidebarProvider>
      <AppSidebar chats={data.chats} />
      <main className="relative flex w-full flex-1 flex-col overflow-hidden transition-[width,height]">
        <Chat messages={messages} />
        <ChatForm messages={messages} />
      </main>
    </SidebarProvider>
  );
}
