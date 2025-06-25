import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/Chat";
import ChatForm from "@/components/ChatForm";
import { ChatProvider } from "@/contexts/ChatContext";

export default function Layout() {
  
  return (
    <SidebarProvider>
      <ChatProvider>
        <AppSidebar />
        <main className="relative flex w-full flex-1 flex-col overflow-hidden transition-[width,height]">
          <Chat />
          <ChatForm />
        </main>
      </ChatProvider>
    </SidebarProvider>
  );
}
