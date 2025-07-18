import { Loader, X, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { deleteChat, editChat } from "@/lib/chat-utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ChatLink({ chat, activeUrlId }: { chat: Chat, activeUrlId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (!isEditing) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (isEditing && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    inputRef.current?.select();
  };

  return (
    <ContextMenu onOpenChange={() => inputRef.current?.select()}>
      <ContextMenuTrigger> 
        <SidebarMenuItem>
          <SidebarMenuButton
            ref={wrapperRef}
            isActive={activeUrlId === chat.urlId}
            asChild
          >
            <div
              onDoubleClick={handleDoubleClick}
              onMouseDown={(e) => {
                if (e.button === 0 && !alertOpen && !isEditing) {
                  window.history.pushState({}, "", `/chat/${chat.urlId}`);
                }
              }}
              key={chat.id}
              className="group/link relative h-9"
            >
                <Input
                  ref={inputRef}
                  className={`${isEditing ? "cursor-text" : "pointer-events-none truncate"} " px-0 bg-transparent dark:bg-transparent hover:truncate-none text-muted-foreground font-medium outline-none selection:bg-teal-900 selection:text-foreground border-none text-muted-foreground ring-0 dark:text-muted-foreground dark:ring-0`}
                  value={chat.title}
                  onChange={(e) => editChat(chat.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                {chat.messages.find(message => message.status === "streaming" || message.status === "pending") &&
                  <Loader className="animate-spin h-4 w-4 text-muted-foreground absolute right-2" />
                }
                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <AlertDialogTrigger asChild>
                    <div className={`${isEditing ? "translate-x-full" : "group-hover/link:translate-x-0"} " pointer-events-auto absolute right-1 bottom-0 top-0 z-50 flex translate-x-full items-center justify-end text-muted-foreground transition-transform group-hover/link:bg-sidebar-accent`}>
                      <div className="pointer-events-none absolute bottom-0 right-[100%] top-0 h-8 w-8 bg-gradient-to-l from-sidebar-accent to-transparent opacity-0 group-hover/link:opacity-100"></div>
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        className="rounded-md p-1.5 hover:bg-teal-500/30"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-sidebar border-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                      <AlertDialogDescription>
                        {`Are you sure you want to delete "${chat.title}" This action cannot be undone.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button variant="destructive" onClick={() => setAlertOpen(false)}>Cancel</Button>
                      <Button onClick={(e) => deleteChat(e, chat)} variant="secondary">Continue</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDoubleClick}>
          <Pencil />
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setAlertOpen(true)}>
          <X />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}