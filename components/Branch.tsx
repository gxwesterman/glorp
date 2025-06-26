import { Chat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Split } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startChat, addMessage } from "@/lib/chat-utils";

export default function Branch({ chat, className }: { chat: Chat, className?: string }) {

  function handleClick() {
    const id = startChat("Branch from " + chat.title);
    window.history.pushState({}, '', window.location.href + `/${id}`);
  }

  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" className={className} onClick={handleClick}>
          <Split />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Branch off</p>
      </TooltipContent>
    </Tooltip>
  )
}