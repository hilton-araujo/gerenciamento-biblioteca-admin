
import { Button } from "@/components/ui/button";
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
        <div className={cn("pb-4 mb-4 border-b animate-fade-in", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {backUrl && (
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="w-8 h-8 mr-1"
                        >
                            <Link href={backUrl}>
                                <ChevronLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                        {Icon && (
                            <Icon className="w-5 h-5 text-muted-foreground" />
                        )}
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    </div>
                </div>
                {addUrl && (
                    <Button
                        asChild
                        className="flex items-center gap-1 transition-all hover:gap-2"
                    >
                        <Link href={addUrl}>
                            <PlusCircle className="w-4 h-4" />
                            <span>{addLabel}</span>
                        </Link>
                    </Button>
                )}
            </div>
            {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}