import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { X } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";

export function AppSidebar() {

  const { chats, deleteChat } = useChat();
  const pathname = usePathname();
  const activeUrlId = useMemo(() => {
    return (pathname.split("/").pop() || "");
  }, [pathname]);

  const handleClick = (urlId: string) => {
    if (urlId) {
      window.history.pushState({}, "", `/chat/${urlId}`);
    } else {
      window.history.pushState({}, "", "/chat");
    }
  };

  return (
    <Sidebar className="border-none">
      <SidebarContent className="px-1">
        <SidebarHeader className="flex items-center shrink-0 px-3 pt-3.5 pb-1 text-lg">
          <a
            className="hover:cursor-pointer font-semibold"
            onMouseDown={() => handleClick("")}
          >
            G6.chat
          </a>
        </SidebarHeader>
        <SidebarMenu className="px-3">
          <Button onClick={() =>window.history.pushState({}, "", "/chat")}>New Chat</Button>
          <div className="border-b border-border my-4"></div>
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton
                isActive={activeUrlId === chat.urlId}
                asChild
                className="py-[1.125rem] group/item relative"
              >
                <a
                  onMouseDown={() => handleClick(chat.urlId)}
                  key={chat.id}
                  className="hover:cursor-pointer hover:bg-sidebar-accent flex items-center justify-between"
                >
                  <div className="truncate max-w-[75%] font-semibold text-muted-foreground">{`${chat.title}`}</div>
                  <button
                    className="cursor-pointer hover:bg-primary/20 rounded-md p-1.5 absolute right-[-2rem] transition-all group-hover/item:right-1"
                    onMouseDown={(e) => deleteChat(e, chat)}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
