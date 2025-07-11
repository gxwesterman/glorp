"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ChatForm from "@/components/ChatForm";
import { ChatProvider } from "@/contexts/ChatContext";
import Chat from "@/components/Chat";
import { db } from "@/lib/instant";
import { redirect } from "next/navigation";
import { CustomTrigger } from "@/components/CustomTrigger";

export default function Layout() {

  const { user, isLoading, error } = db.useAuth();

  if (isLoading) {
    return;
  }

  if (error) {
    return <div className="p-4 text-red-500">Uh oh! {error.message}</div>;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <ChatProvider>
        <AppSidebar />
        <CustomTrigger />
        <main className="relative flex w-full flex-1 flex-col overflow-hidden transition-[width,height] h-dvh min-h-dvh">
          <Chat />
          <ChatForm />
        </main>
      </ChatProvider>
    </SidebarProvider>
  );
}
