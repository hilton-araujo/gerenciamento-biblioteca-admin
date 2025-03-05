import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/shared/ui/sidebar";
import {
    BookOpenCheck,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navbarConfig } from "@/config/navbarItems";
import { useState } from "react";
import { Button } from "@/components/shared/ui/button";

export function LibrarySidebar() {
    const navigate = useRouter();
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { state, isMobile } = useSidebar();
    const isCollapsed = state === "collapsed";

    const isCurrentPath = (path: string) => {
        return pathname === path;
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            navigate.push("/");
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleNavigation = async (href: string) => {
        // Add a delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate.push(href);
    };

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-border bg-gradient-to-b from-background to-background/95 backdrop-blur-sm"
        >
            <SidebarHeader className={cn(
                "flex items-center h-16 px-4 border-b",
                isCollapsed && "justify-center"
            )}>
                <div className={cn(
                    "flex items-center gap-3 font-semibold cursor-pointer group",
                    isCollapsed && "justify-center"
                )}>
                    <div className={cn(
                        "p-2 transition-colors rounded-lg bg-primary/10 group-hover:bg-primary/20",
                        isCollapsed && "p-1.5"
                    )}>
                        <BookOpenCheck className={cn(
                            "w-5 h-5 transition-transform text-primary group-hover:scale-110",
                            isCollapsed && "w-4 h-4"
                        )} />
                    </div>
                    {!isCollapsed && (
                        <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80">
                            Biblioteca
                        </span>
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent className={cn(
                "px-2",
                isCollapsed && "px-1"
            )}>
                <SidebarGroup>
                    {!isCollapsed && (
                        <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground/70">
                            Menu
                        </SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navbarConfig.map((item) => (
                                <SidebarMenuItem key={item?.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                            "text-muted-foreground hover:text-foreground",
                                            "hover:bg-accent/50",
                                            isCurrentPath(item.href) &&
                                            "bg-accent text-accent-foreground font-medium shadow-sm",
                                            isCollapsed && "justify-center px-2 py-2"
                                        )}
                                    >
                                        <button
                                            onClick={() => handleNavigation(item.href)}
                                            className={cn(
                                                "flex items-center gap-3 w-full",
                                                isCollapsed && "justify-center"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-1.5 rounded-md transition-colors",
                                                isCurrentPath(item.href) ? "bg-foreground/10" : "bg-transparent",
                                                isCollapsed && "p-1"
                                            )}>
                                                {item?.icon}
                                            </div>
                                            {!isCollapsed && <span className="text-sm">{item?.title}</span>}
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className={cn(
                    "p-2 border-t",
                    isCollapsed && "p-1"
                )}>
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-3 text-sm text-muted-foreground hover:text-foreground",
                            isCollapsed && "justify-center px-2 py-2"
                        )}
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        <LogOut className={cn(
                            "w-4 h-4 transition-all",
                            isLoggingOut && "animate-spin",
                            isCollapsed && "w-3.5 h-3.5"
                        )} />
                        {!isCollapsed && <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>}
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}