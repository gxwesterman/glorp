'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import ChatLink from "@/components/ChatLink";

export function AppSidebar() {

  const { chats } = useChat();
  const pathname = usePathname();
  const activeUrlId = pathname.split("/").pop() || "";

  return (
    <Sidebar className="border-none">
      <SidebarContent className="px-1">
        <SidebarHeader className="flex items-center shrink-0 px-3 pt-3.5 pb-1 text-lg">
          <a
            className="hover:cursor-pointer font-semibold"
            onMouseDown={() => window.history.pushState({}, "", "/chat")}
          >
            Glorp
          </a>
        </SidebarHeader>
        <SidebarMenu className="px-3">
          <Button className="bg-teal-700 border border-teal-600 text-foreground hover:bg-teal-600" onClick={() =>window.history.pushState({}, "", "/chat")}>New Chat</Button>
          <div className="border-b border-border my-4"></div>
          {chats.map((chat) => (
            <ChatLink key={chat.id} chat={chat} activeUrlId={activeUrlId} />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
