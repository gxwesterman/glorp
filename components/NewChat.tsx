import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import { BookOpen, Code, Telescope } from "lucide-react";
import Image from "next/image";

function PromptButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 border-t border-secondary/40 py-1 first:border-none">
      <button className="w-full rounded-md py-2 text-left text-secondary-foreground hover:bg-secondary/50 sm:px-3">
        <span className="text-muted-foreground">{children}</span>
      </button>
    </div>
  )
}

export default function NewChat() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col space-y-12 px-4 pb-10">
      <div className="flex h-[calc(100vh-20rem)] items-start justify-center">
        <div className="w-full space-y-6 px-2 pt-[25vh] duration-300 animate-in fade-in-50 zoom-in-95 sm:px-8">
          <h2 className="font-semibold text-3xl">
            How can I help you?
          </h2>
          <div className="flex w-full">
            <div className="flex flex-col gap-2">
              <Tabs defaultValue="learn">
                <TabsList>
                  <TabsTrigger value="learn"><BookOpen />Learn</TabsTrigger>
                  <TabsTrigger value="code"><Code />Code</TabsTrigger>
                  <TabsTrigger value="explore"><Telescope />Explore</TabsTrigger>
                  <TabsTrigger value="glorp">
                    <Image
                      src="/glorp.svg"
                      width={20}
                      height={20}
                      alt="Logo"
                      style={{ filter: "grayscale(100%)" }}
                    />
                    Glorp
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="learn">Make changes to your account here.</TabsContent>
                <TabsContent value="code">Change your password here.</TabsContent>
                <TabsContent value="explore">Make changes to your account here.</TabsContent>
                <TabsContent value="glorp">
                  <PromptButton>Glorp glorp glorp glorp?</PromptButton>
                  <PromptButton>Glorp glorp glorp, glorp glorp glorp glorp, and glorp glorp.</PromptButton>
                  <PromptButton>Glorp glorp glorp (glorp glorp glorp), glorp glorp glorp.</PromptButton>
                  <PromptButton>Glorp <b>glorp</b> <i>glorp</i>!</PromptButton>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}