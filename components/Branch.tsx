import { Chat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Split } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startChat, addMessage } from "@/lib/chat-utils";
import { useChat } from "@/contexts/ChatContext";

export default function Branch({ index, className }: { index: number, className?: string }) {

  const { user, chat } = useChat();
  function handleClick() {
    const messages = chat.messages;
    const id = startChat("Branch from " + chat.title, user.id);
    for (let i = 0; i <= index; i++) {
      const message = messages[i];
      addMessage(message.text, message.html, message.type, id);
    }
    window.history.pushState({}, '', `/chat/${id}`);
  }

  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" className={className} onClick={handleClick}>
          <Split />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Branch</p>
      </TooltipContent>
    </Tooltip>
  )
}