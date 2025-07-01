import { Loader, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/types";
import { useState } from "react";
import { deleteChat } from "@/lib/chat-utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function ChatLink({ chat, activeUrlId }: { chat: Chat, activeUrlId: string }) {

  const [toggle, setToggle] = useState<string[]>([]);

  const handleDoubleClick = (chat: Chat) => {
    setToggle([...toggle, chat.id]);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={activeUrlId === chat.urlId}
        asChild
        className="py-[1.125rem] group/item relative"
      >
        {toggle.includes(chat.id) ? (
          <Input></Input>
        ) : (
          <a
            onDoubleClick={() => handleDoubleClick(chat)}
            onMouseDown={() => window.history.pushState({}, "", `/chat/${chat.urlId}`)}
            key={chat.id}
            className="hover:cursor-pointer hover:bg-sidebar-accent flex items-center justify-between"
          >
            <div className="truncate max-w-[75%] font-semibold text-muted-foreground">{`${chat.title}`}</div>
            {chat.messages.find(message => message.status === "streaming" || message.status === "pending") ?
              (
                <Loader className="animate-spin" />
              ) : (
                <button
                  className="cursor-pointer hover:bg-primary/20 rounded-md p-1.5 absolute right-[-2rem] transition-all group-hover/item:right-1"
                  onMouseDown={(e) => deleteChat(e, chat)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )
            }
          </a>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}