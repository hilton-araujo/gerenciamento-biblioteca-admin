import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { navbarConfig } from "@/config/navbarItems"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import Link from "next/link"
import { JSX, useState } from "react"
import { useAtom } from "jotai"
import { isSidebarOpen } from "@/atom/application-atoms"

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Gereciamento</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navbarConfig.map((item, index) => (
                                <NavItem item={item} key={index} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

function NavItem({ item }: {
    item: {
        title: string,
        href?: string,
        icon: JSX.Element,
        submenu?: {
            title: string,
            href: string,
            icon?: JSX.Element
        }[]
    }
}) {
    const pathname = usePathname();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const handleSubmenuToggle = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <SidebarMenuItem key={item.title}>
                        {item.submenu ? (
                            <div
                                className="flex items-center justify-between w-full cursor-pointer"
                                onClick={handleSubmenuToggle}
                            >
                                <SidebarMenuButton isActive={pathname === item.href}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                                <span>{isSubmenuOpen ? "▾" : "▸"}</span>
                            </div>

                        ) : (
                            <SidebarMenuButton asChild isActive={pathname === item.href}>
                                <Link href={item.href || "#"}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                    {item.submenu && isSubmenuOpen && (
                        <div className="ml-4">
                            <SidebarMenu>
                                {item.submenu.map((subitem, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild isActive={pathname === subitem.href}>
                                            <Link href={subitem.href}>
                                                {subitem.icon}
                                                <span>{subitem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    )}
                </TooltipTrigger>
                <TooltipContent align="end">
                    <p>{item.title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function Logo() {
    const [isNavbarOpen] = useAtom(isSidebarOpen)
    return (
        <div className="flex items-center">
            {isNavbarOpen && <h1 className="hidden font-bold text-2xl pt-2 md:flex">Bilioteca</h1>}
        </div>
    )
}