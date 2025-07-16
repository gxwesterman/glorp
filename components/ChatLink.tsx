import { Loader, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chat } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { deleteChat, editChat } from "@/lib/chat-utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ChatLink({ chat, activeUrlId }: { chat: Chat, activeUrlId: string }) {
  const [toggle, setToggle] = useState("");
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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
        className="py-[1.125rem]"
      >
          {isEditing ? (
            <Input
              ref={inputRef}
              className="selection:bg-teal-900 selection:text-foreground border-none text-muted-foreground ring-0 dark:text-muted-foreground dark:ring-0"
              value={chat.title}
              onChange={(e) => editChat(chat.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : (
            <div
              onDoubleClick={handleDoubleClick}
              onMouseDown={() => {
                if (!open) {
                  window.history.pushState({}, "", `/chat/${chat.urlId}`);
                }
              }}
              key={chat.id}
              className="group/link relative flex h-9 w-full items-center overflow-hidden rounded-lg px-2 py-1 text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring hover:focus-visible:bg-sidebar-accent"
            >
              <div className="relative flex w-full items-center">
                <div className="hover:truncate-none h-full w-full px-1 py-1 text-muted-foreground font-medium outline-none pointer-events-none cursor-pointer truncate">
                  {chat.title}
                </div>
                {chat.messages.find(message => message.status === "streaming" || message.status === "pending") &&
                  <Loader className="animate-spin h-4 w-4 text-muted-foreground absolute right-0" />
                }
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <div className="pointer-events-auto absolute -right-1 bottom-0 top-0 z-50 flex translate-x-full items-center justify-end text-muted-foreground transition-transform group-hover/link:translate-x-0 group-hover/link:bg-sidebar-accent">
                      <div className="pointer-events-none absolute bottom-0 right-[100%] top-0 h-12 w-8 bg-gradient-to-l from-sidebar-accent to-transparent opacity-0 group-hover/link:opacity-100"></div>
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
                      <Button variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
                      <Button onClick={(e) => deleteChat(e, chat)} variant="secondary">Continue</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}