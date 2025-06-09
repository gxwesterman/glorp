"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { chats } from "@/lib/example";

export default function Layout() {

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <main className="relative flex w-full flex-1 flex-col overflow-hidden transition-[width,height]">
      </main>
    </SidebarProvider>
  );
}
