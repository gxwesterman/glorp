"use client";

import React, { useState } from "react";
import { User } from "@instantdb/react";
import { db } from "@/lib/instant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { redirect } from "next/navigation";

function App() {
  const { isLoading, user, error } = db.useAuth();

  if (isLoading) {
    return;
  }

  if (error) {
    return <div className="p-4 text-red-500">Uh oh! {error.message}</div>;
  }

  if (user) {
    return redirect("/chat");
  }

  return <Login />;
}

function Main({ user }: { user: User }) {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Hello {user.email}!</h1>
      <button
        onClick={() => db.auth.signOut()}
        className="px-3 py-1 bg-blue-600 text-white font-bold hover:bg-blue-700"
      >
        Sign out
      </button>
    </div>
  );
}

function Login() {
  const [sentEmail, setSentEmail] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md">
        {!sentEmail ? (
          <EmailStep onSendEmail={setSentEmail} />
        ) : (
          <CodeStep sentEmail={sentEmail} />
        )}
      </div>
    </div>
  );
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputEl = inputRef.current!;
    const email = inputEl.value;
    onSendEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
      onSendEmail("");
    });
  };
  return (
    <form
      key="email"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 items-center"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2">
        Glorp
        <Image
          src="/glorp.svg"
          width={50}
          height={0}
          alt="Logo"
          placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ5IiBoZWlnaHQ9IjM0OSIgdmlld0JveD0iMCAwIDM0OSAzNDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2lpXzBfMSkiPgo8cGF0aCBkPSJNMzYuNzM2OCA4MC4yNDFDMzYuNzM2OCA3OC43MDYgMzYuNzM2OCA3Ny45Mzg0IDM2Ljc1NyA3Ny4yODk1QzM3LjQ0MjcgNTUuMTk0MyA1NS4xOTQzIDM3LjQ0MjcgNzcuMjg5NSAzNi43NTdDNzcuOTM4NCAzNi43MzY4IDc4LjcwNiAzNi43MzY4IDgwLjI0MSAzNi43MzY4Qzg4LjQyNzkgMzYuNzM2OCA5Mi41MjEzIDM2LjczNjggOTUuOTgyNSAzNi44NDQzQzIxMy44MjQgNDAuNTAxNiAzMDguNDk4IDEzNS4xNzYgMzEyLjE1NiAyNTMuMDE3QzMxMi4yNjMgMjU2LjQ3OSAzMTIuMjYzIDI2MC41NzIgMzEyLjI2MyAyNjguNzU5QzMxMi4yNjMgMjcwLjI5NCAzMTIuMjYzIDI3MS4wNjIgMzEyLjI0MyAyNzEuNzExQzMxMS41NTcgMjkzLjgwNiAyOTMuODA2IDMxMS41NTcgMjcxLjcxMSAzMTIuMjQzQzI3MS4wNjIgMzEyLjI2MyAyNzAuMjk0IDMxMi4yNjMgMjY4Ljc1OSAzMTIuMjYzSDk4LjY3NjJDNzkuOTYxNiAzMTIuMjYzIDcwLjYwNDIgMzEyLjI2MyA2My4xODE0IDMwOS4zMjRDNTIuNDM3IDMwNS4wNyA0My45Mjk4IDI5Ni41NjMgMzkuNjc1OCAyODUuODE5QzM2LjczNjggMjc4LjM5NiAzNi43MzY4IDI2OS4wMzggMzYuNzM2OCAyNTAuMzI0VjgwLjI0MVoiIGZpbGw9IiMxQjkzODgiLz4KPC9nPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kXzBfMSkiPgo8cGF0aCBkPSJNNzcuMDUyNiAxODYuOTYxQzc3LjA1MjYgMTc2LjU3NiA4NS40NzEgMTY4LjE1OCA5NS44NTU3IDE2OC4xNThMMjQwLjE0NCAxNjguMTU4QzI1MC41MjkgMTY4LjE1OCAyNTguOTQ3IDE3Ni41NzYgMjU4Ljk0NyAxODYuOTYxTDI1OC45NDcgMTkwLjg5NUMyNTguOTQ3IDI0MS4xMjQgMjE4LjIyOSAyODEuODQyIDE2OCAyODEuODQyQzExNy43NzEgMjgxLjg0MiA3Ny4wNTI2IDI0MS4xMjQgNzcuMDUyNiAxOTAuODk1VjE4Ni45NjFaIiBmaWxsPSIjNTRFOUQyIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaWlfMF8xIiB4PSIyNi43MzY4IiB5PSIyNi43MzY4IiB3aWR0aD0iMjk1LjUyNiIgaGVpZ2h0PSIyOTUuNTI2IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjEwIiBkeT0iMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAxIDAgMCAwIDAgMC45MTY2NjYgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzBfMSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR4PSItMTAiIGR5PSItMTAiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMF8xIiByZXN1bHQ9ImVmZmVjdDJfaW5uZXJTaGFkb3dfMF8xIi8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2RfMF8xIiB4PSI3Ny4wNTI2IiB5PSIxNjguMTU4IiB3aWR0aD0iMTkxLjg5NSIgaGVpZ2h0PSIxMjMuNjg0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjUiIGR5PSI1Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIuNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18wXzEiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMF8xIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo="
          style={{ maxHeight: 50 }}
        />
      </h2>
      <p className="text-muted-foreground">
        Enter your email to receive a verification code.
      </p>
      <Input
        className="ring-0 dark:ring-0"
        ref={inputRef}
        type="email"
        placeholder="Enter your email"
        required
        autoFocus
      />
      <Button
        variant="secondary"
        type="submit"
        className="bg-radial-[at_0%_25%] from-teal-700 to-teal-900 hover:to-teal-700 text-foreground transition-colors font-semibold shadow w-full"
      >
        Send Code
      </Button>
    </form>
  );
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputEl = inputRef.current!;
    const code = inputEl.value;
    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      inputEl.value = "";
      alert("Uh oh :" + err.body?.message);
    });
  };

  return (
    <form
      key="code"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 items-center"
    >
      <h2 className="text-xl font-bold">Enter your code</h2>
      <p className="text-teal-100">
        We sent an email to <strong>{sentEmail}</strong>. Check your email, and
        paste the code you see.
      </p>
      <Input
        className="ring-0 dark:ring-0"
        ref={inputRef}
        type="text"
        placeholder="123456..."
        required
        autoFocus
      />
      <Button
        variant="secondary"
        type="submit"
        className="bg-radial-[at_0%_25%] from-teal-700 to-teal-900 hover:to-teal-700 text-foreground transition-colors font-semibold shadow w-full"
      >
        Verify Code
      </Button>
    </form>
  );
}

export default App;