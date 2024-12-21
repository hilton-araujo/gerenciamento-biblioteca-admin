'use client'
import './globals.css'
import * as React from "react"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <html lang="en" className="h-full bg-[#E8EAF6]">
          <title>Gerenciamento de Biblioteca</title>
          <body>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
              <main className="flex w-full">
                {children}
              </main>
              <Toaster />
            </div>
          </body>
        </html>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
