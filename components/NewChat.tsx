import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import { BookOpen, Code, Telescope } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/contexts/ChatContext";

function PromptButton({ children }: { children: string }) {
  const { setInput } = useChat();

  return (
    <div className="flex items-start gap-2 border-t border-secondary/40 py-1 first:border-none">
      <button onClick={() => setInput(children)} className="w-full rounded-md py-2 text-left text-secondary-foreground hover:bg-secondary/50 sm:px-3">
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
            How can I help?
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
                <TabsContent value="learn">
                  <PromptButton>What are some of the environmental impacts of AI?</PromptButton>
                  <PromptButton>Is AI profitable?</PromptButton>
                  <PromptButton>Is AI a bubble that depends wholly on a cabal of morally bankrupt tech bros leeching off of greedy CEOs and an increasingly ignorant general public that exists only to mindlessly satiate their insatiable dopamine addiction with slop?</PromptButton>
                  <PromptButton>How many types of bears are there?</PromptButton>
                </TabsContent>
                <TabsContent value="code">
                  <PromptButton>Write code to transpose a matrix in C</PromptButton>
                  <PromptButton>Convert this Zig script to Python</PromptButton>
                  <PromptButton>Explain the use of keys in React</PromptButton>
                  <PromptButton>How should I implement authorization for my SPA using laravel</PromptButton>
                </TabsContent>
                <TabsContent value="explore">
                  <PromptButton>Best vacation spots</PromptButton>
                  <PromptButton>Apples vs oranges</PromptButton>
                  <PromptButton>Gulf war</PromptButton>
                  <PromptButton>Does Iran have any nuclear weapons?</PromptButton>
                </TabsContent>
                <TabsContent value="glorp">
                  <PromptButton>Glorp glorp glorp glorp?</PromptButton>
                  <PromptButton>Glorp glorp glorp, glorp glorp glorp glorp, and glorp glorp.</PromptButton>
                  <PromptButton>Glorp glorp glorp (glorp glorp glorp), glorp glorp glorp.</PromptButton>
                  <PromptButton>Glorp GLORP!</PromptButton>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}