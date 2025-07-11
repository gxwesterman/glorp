import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
 
export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()
 
  return (
    <Button
      className="absolute z-10 inset-2.5"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <PanelLeft />
    </Button>
  )
}