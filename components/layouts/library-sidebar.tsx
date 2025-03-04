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

    const isCurrentPath = (path: string) => {
        return pathname === path;
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Add any logout logic here
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
            navigate.push("/");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <Sidebar className="border-r border-border bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
            <SidebarHeader className="flex items-center px-4 border-b h-16">
                <div className="flex items-center gap-3 font-semibold group cursor-pointer">
                    <div className="p-2 rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <BookOpenCheck className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                        Biblioteca
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground/70">
                        Menu
                    </SidebarGroupLabel>
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
                                            "bg-accent text-accent-foreground font-medium shadow-sm"
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-1.5 rounded-md transition-colors",
                                                isCurrentPath(item.href) ? "bg-foreground/10" : "bg-transparent"
                                            )}>
                                                {item?.icon}
                                            </div>
                                            <span className="text-sm">{item?.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-sm text-muted-foreground hover:text-foreground"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        <LogOut className={cn(
                            "w-4 h-4 transition-all",
                            isLoggingOut && "animate-spin"
                        )} />
                        <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}