"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { chats } from "@/lib/example";
import Chat from "@/components/Chat";
import ChatForm from "@/components/ChatForm";
import { usePathname } from "next/navigation";

export default function Layout() {

  const pathname = usePathname();
  const pageChatId = pathname.split("/").pop() || "";
  const chat = chats.find((chat) => chat.urlId === pageChatId);
  const messages = chat ? chat.messages : [];
  
  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <main className="relative flex w-full flex-1 flex-col overflow-hidden transition-[width,height]">
        <Chat messages={messages} />
        <ChatForm messages={messages} />
      </main>
    </SidebarProvider>
  );
}
