'use client'
import './globals.css'
import * as React from "react"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { TooltipProvider } from '@/components/shared/ui/tooltip';
import { Toaster } from '@/components/shared/ui/toaster';

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <html lang="en">
          <title>Gerenciamento de Biblioteca</title>
          <body>
            <div className="">
              <main className='flex w-full min-h-screen'>
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
