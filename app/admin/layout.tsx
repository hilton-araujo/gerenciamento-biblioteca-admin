"use client";

import { LibrarySidebar } from "@/components/layouts/library-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/shared/ui/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider className="min-h-screen">
            <div className="flex w-full min-h-screen">
                <LibrarySidebar />
                <div className="flex flex-col flex-1">
                    <header className="flex items-center px-4 border-b h-14 lg:px-6">
                        <SidebarTrigger />
                    </header>
                    <main className="flex-1 p-4 overflow-auto lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
