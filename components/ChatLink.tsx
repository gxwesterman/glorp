import { Loader, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { deleteChat, editChat } from "@/lib/chat-utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function ChatLink({ chat, activeUrlId }: { chat: Chat, activeUrlId: string }) {
  const [toggle, setToggle] = useState("");
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEditing = toggle === chat.id;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setToggle('');
    }
  }

  useEffect(() => {
    if (!isEditing) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setToggle('');
      }
    };
    inputRef?.current?.select();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  const handleDoubleClick = () => {
    setToggle(chat.id);
    inputRef.current?.select();
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        ref={wrapperRef}
        isActive={activeUrlId === chat.urlId}
        asChild
        className="py-[1.125rem] group/item relative"
      >
          {isEditing ? (
            <Input
              ref={inputRef}
              className="selection:bg-teal-900 selection:text-foreground border-none text-muted-foreground font-semibold ring-0 dark:text-muted-foreground dark:font-semibold dark:ring-0"
              value={chat.title}
              onChange={(e) => editChat(chat.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : (
            <a
              onDoubleClick={handleDoubleClick}
              onMouseDown={() => window.history.pushState({}, "", `/chat/${chat.urlId}`)}
              key={chat.id}
              className="hover:bg-sidebar-accent flex items-center justify-between select-none"
            >
              <div className="truncate max-w-[75%] font-semibold text-muted-foreground">
                {chat.title}
              </div>
              {chat.messages.find(message =>
                message.status === "streaming" || message.status === "pending"
              ) ? (
                <Loader className="animate-spin" />
              ) : (
                <button
                  className="cursor-pointer hover:bg-primary/20 rounded-md p-1.5 absolute right-[-2rem] transition-all group-hover/item:right-1"
                  onMouseDown={(e) => deleteChat(e, chat)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </a>
          )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}