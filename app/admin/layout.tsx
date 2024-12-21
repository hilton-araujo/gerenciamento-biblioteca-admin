"use client";
import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAtom } from "jotai";
import { isSidebarOpen } from "@/atom/application-atoms";
import AppHeader from "@/components/app-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [navbarOpen, setNavbarOpen] = useAtom(isSidebarOpen)

    return (
        <SidebarProvider open={navbarOpen} onOpenChange={(open) => setNavbarOpen(open)}>
            <AppSidebar />
            <main className="w-full">
                <div className="flex flex-col w-full">
                    <AppHeader />
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}
