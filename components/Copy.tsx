import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Branch({ content, className }: { content: string, className?: string }) {

  const [copied, setCopied] = useState(false);
  function handleClick() {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Tooltip disableHoverableContent delayDuration={100}>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" className={cn(className, "relative")} onClick={handleClick}>
          <Copy className={cn("absolute transition-scale duration-200", copied ? "scale-0" : "scale-100")} />
          <Check className={cn("absolute transition-scale duration-200", copied ? "scale-100" : "scale-0")} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{copied ? "Copied" : "Copy"}</p>
      </TooltipContent>
    </Tooltip>
  )
}