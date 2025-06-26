import { Chat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Split } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startChat, addMessage } from "@/lib/chat-utils";

export default function Branch({ chat, index, className }: { chat: Chat, index: number, className?: string }) {

  function handleClick() {
    const messages = chat.messages;
    const id = startChat("Branch from " + chat.title);
    for (let i = 0; i <= index; i++) {
      const message = messages[i];
      addMessage(message.text, message.type, id);
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