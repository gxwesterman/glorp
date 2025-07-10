"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { db } from "@/lib/instant";

export default function Page() {
  const { user } = db.useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 px-8 flex items-center justify-between">
        <div className="text-lg flex gap-2">
          Glorp
          <Image
            src="/glorp.svg"
            width={30}
            height={30}
            alt="Logo"
            placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ5IiBoZWlnaHQ9IjM0OSIgdmlld0JveD0iMCAwIDM0OSAzNDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2lpXzBfMSkiPgo8cGF0aCBkPSJNMzYuNzM2OCA4MC4yNDFDMzYuNzM2OCA3OC43MDYgMzYuNzM2OCA3Ny45Mzg0IDM2Ljc1NyA3Ny4yODk1QzM3LjQ0MjcgNTUuMTk0MyA1NS4xOTQzIDM3LjQ0MjcgNzcuMjg5NSAzNi43NTdDNzcuOTM4NCAzNi43MzY4IDc4LjcwNiAzNi43MzY4IDgwLjI0MSAzNi43MzY4Qzg4LjQyNzkgMzYuNzM2OCA5Mi41MjEzIDM2LjczNjggOTUuOTgyNSAzNi44NDQzQzIxMy44MjQgNDAuNTAxNiAzMDguNDk4IDEzNS4xNzYgMzEyLjE1NiAyNTMuMDE3QzMxMi4yNjMgMjU2LjQ3OSAzMTIuMjYzIDI2MC41NzIgMzEyLjI2MyAyNjguNzU5QzMxMi4yNjMgMjcwLjI5NCAzMTIuMjYzIDI3MS4wNjIgMzEyLjI0MyAyNzEuNzExQzMxMS41NTcgMjkzLjgwNiAyOTMuODA2IDMxMS41NTcgMjcxLjcxMSAzMTIuMjQzQzI3MS4wNjIgMzEyLjI2MyAyNzAuMjk0IDMxMi4yNjMgMjY4Ljc1OSAzMTIuMjYzSDk4LjY3NjJDNzkuOTYxNiAzMTIuMjYzIDcwLjYwNDIgMzEyLjI2MyA2My4xODE0IDMwOS4zMjRDNTIuNDM3IDMwNS4wNyA0My45Mjk4IDI5Ni41NjMgMzkuNjc1OCAyODUuODE5QzM2LjczNjggMjc4LjM5NiAzNi43MzY4IDI2OS4wMzggMzYuNzM2OCAyNTAuMzI0VjgwLjI0MVoiIGZpbGw9IiMxQjkzODgiLz4KPC9nPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kXzBfMSkiPgo8cGF0aCBkPSJNNzcuMDUyNiAxODYuOTYxQzc3LjA1MjYgMTc2LjU3NiA4NS40NzEgMTY4LjE1OCA5NS44NTU3IDE2OC4xNThMMjQwLjE0NCAxNjguMTU4QzI1MC41MjkgMTY4LjE1OCAyNTguOTQ3IDE3Ni41NzYgMjU4Ljk0NyAxODYuOTYxTDI1OC45NDcgMTkwLjg5NUMyNTguOTQ3IDI0MS4xMjQgMjE4LjIyOSAyODEuODQyIDE2OCAyODEuODQyQzExNy43NzEgMjgxLjg0MiA3Ny4wNTI2IDI0MS4xMjQgNzcuMDUyNiAxOTAuODk1VjE4Ni45NjFaIiBmaWxsPSIjNTRFOUQyIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaWlfMF8xIiB4PSIyNi43MzY4IiB5PSIyNi43MzY4IiB3aWR0aD0iMjk1LjUyNiIgaGVpZ2h0PSIyOTUuNTI2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjEwIiBkeT0iMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAxIDAgMCAwIDAgMC45MTY2NjYgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzBfMSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMTAiIGR5PSItMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMF8xIiByZXN1bHQ9ImVmZmVjdDJfaW5uZXJTaGFkb3dfMF8xIi8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2RfMF8xIiB4PSI3Ny4wNTI2IiB5PSIxNjguMTU4IiB3aWR0aD0iMTkxLjg5NSIgaGVpZ2h0PSIxMjMuNjg0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjUiIGR5PSI1Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIuNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18wXzEiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMF8xIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo="
            style={{ maxHeight: 30 }}
          />
        </div>
        <div className="space-x-6">
          <Button asChild>
            <Link href="https://github.com/gxwesterman/glorp" target="_blank">Star on GitHub</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild className="bg-radial-[at_0%_25%] from-teal-700 to-teal-900 hover:to-teal-700 text-foreground transition-colors font-semibold shadow">
            <Link href={`${user ? "/chat" : "/login"}`}>Log In</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 relative z-10">
        <div className="container mx-auto flex flex-col items-start py-10 px-4">
          <h1 className="text-start mt-10 text-6xl font-bold tracking-tighter mb-4">Welcome to the Best AI Chatbot</h1>
          <p className="max-w-[600px] text-muted-foreground text-xl mb-8 text-start">Blazingly fast, beautifully highlighted, completely synced, permanent storage, buttery smooth.</p>
          <Button
            asChild
            variant="secondary"
            className="bg-radial-[at_0%_25%] from-teal-700 to-teal-900 hover:to-teal-700 text-foreground transition-colors font-semibold shadow"
          >
            <Link href={`${user ? "/chat" : "/login"}`}>
              Ask Glorp
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </main>
      <Image
        className="fixed -right-60 -bottom-60 z-0 opacity-70"
        src="/arc.svg"
        width={1000}
        height={1000}
        alt="Logo"
        placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ5IiBoZWlnaHQ9IjM0OSIgdmlld0JveD0iMCAwIDM0OSAzNDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2lpXzBfMSkiPgo8cGF0aCBkPSJNMzYuNzM2OCA4MC4yNDFDMzYuNzM2OCA3OC43MDYgMzYuNzM2OCA3Ny45Mzg0IDM2Ljc1NyA3Ny4yODk1QzM3LjQ0MjcgNTUuMTk0MyA1NS4xOTQzIDM3LjQ0MjcgNzcuMjg5NSAzNi43NTdDNzcuOTM4NCAzNi43MzY4IDc4LjcwNiAzNi43MzY4IDgwLjI0MSAzNi43MzY4Qzg4LjQyNzkgMzYuNzM2OCA5Mi41MjEzIDM2LjczNjggOTUuOTgyNSAzNi44NDQzQzIxMy44MjQgNDAuNTAxNiAzMDguNDk4IDEzNS4xNzYgMzEyLjE1NiAyNTMuMDE3QzMxMi4yNjMgMjU2LjQ3OSAzMTIuMjYzIDI2MC41NzIgMzEyLjI2MyAyNjguNzU5QzMxMi4yNjMgMjcwLjI5NCAzMTIuMjYzIDI3MS4wNjIgMzEyLjI0MyAyNzEuNzExQzMxMS41NTcgMjkzLjgwNiAyOTMuODA2IDMxMS41NTcgMjcxLjcxMSAzMTIuMjQzQzI3MS4wNjIgMzEyLjI2MyAyNzAuMjk0IDMxMi4yNjMgMjY4Ljc1OSAzMTIuMjYzSDk4LjY3NjJDNzkuOTYxNiAzMTIuMjYzIDcwLjYwNDIgMzEyLjI2MyA2My4xODE0IDMwOS4zMjRDNTIuNDM3IDMwNS4wNyA0My45Mjk4IDI5Ni41NjMgMzkuNjc1OCAyODUuODE5QzM2LjczNjggMjc4LjM5NiAzNi43MzY4IDI2OS4wMzggMzYuNzM2OCAyNTAuMzI0VjgwLjI0MVoiIGZpbGw9IiMxQjkzODgiLz4KPC9nPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kXzBfMSkiPgo8cGF0aCBkPSJNNzcuMDUyNiAxODYuOTYxQzc3LjA1MjYgMTc2LjU3NiA4NS40NzEgMTY4LjE1OCA5NS44NTU3IDE2OC4xNThMMjQwLjE0NCAxNjguMTU4QzI1MC41MjkgMTY4LjE1OCAyNTguOTQ3IDE3Ni41NzYgMjU4Ljk0NyAxODYuOTYxTDI1OC45NDcgMTkwLjg5NUMyNTguOTQ3IDI0MS4xMjQgMjE4LjIyOSAyODEuODQyIDE2OCAyODEuODQyQzExNy43NzEgMjgxLjg0MiA3Ny4wNTI2IDI0MS4xMjQgNzcuMDUyNiAxOTAuODk1VjE4Ni45NjFaIiBmaWxsPSIjNTRFOUQyIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaWlfMF8xIiB4PSIyNi43MzY4IiB5PSIyNi43MzY4IiB3aWR0aD0iMjk1LjUyNiIgaGVpZ2h0PSIyOTUuNTI2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjEwIiBkeT0iMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAxIDAgMCAwIDAgMC45MTY2NjYgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzBfMSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMTAiIGR5PSItMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMF8xIiByZXN1bHQ9ImVmZmVjdDJfaW5uZXJTaGFkb3dfMF8xIi8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2RfMF8xIiB4PSI3Ny4wNTI2IiB5PSIxNjguMTU4IiB3aWR0aD0iMTkxLjg5NSIgaGVpZ2h0PSIxMjMuNjg0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjUiIGR5PSI1Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIuNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18wXzEiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMF8xIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo="
        style={{ maxHeight: 1000 }}
      />
    </div>
  )
}