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
} from "@/components/ui/sidebar";
import {
    BookOpenCheck,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navbarConfig } from "@/config/navbarItems";

export function LibrarySidebar() {
    const navigate = useRouter();
    const pathname = usePathname();

    const isCurrentPath = (path: string) => {
        return pathname === path;
    };

    const handleLogout = () => {
        navigate.push("/");
    };

    return (
        <Sidebar className="border-r border-border">
            <SidebarHeader className="flex items-center px-4 border-b h-14">
                <div className="flex items-center gap-2 font-semibold">
                    <BookOpenCheck className="w-5 h-5" />
                    <span className="text-lg">Biblioteca</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navbarConfig.map((item) => (
                                <SidebarMenuItem key={item?.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                                            isCurrentPath(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center gap-3">
                                            {item?.icon}
                                            <span>{item?.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-4 border-t">
                    <div
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-sm transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}