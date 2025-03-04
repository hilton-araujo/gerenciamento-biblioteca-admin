import { Button } from "@/components/shared/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, LucideIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    backUrl?: string;
    addUrl?: string;
    addLabel?: string;
    className?: string;
}

export function PageHeader({
    title,
    description,
    icon: Icon,
    backUrl,
    addUrl,
    addLabel = "Add",
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                "pb-6 mb-6 border-b animate-fade-in transition-all duration-300",
                "bg-gradient-to-b from-background to-background/80 backdrop-blur-sm",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {backUrl && (
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="mr-1 transition-transform duration-200 w-9 h-9 hover:scale-105"
                        >
                            <Link href={backUrl}>
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                        </Button>
                    )}
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                        )}
                        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80">
                            {title}
                        </h1>
                    </div>
                </div>
                {addUrl && (
                    <Button
                        asChild
                        variant="default"
                        className="flex items-center gap-2 transition-all duration-300 group hover:gap-3"
                    >
                        <Link href={addUrl}>
                            <PlusCircle className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                            <span>{addLabel}</span>
                        </Link>
                    </Button>
                )}
            </div>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground/80 max-w-[80ch]">
                    {description}
                </p>
            )}
        </div>
    );
}