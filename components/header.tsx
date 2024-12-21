import React from 'react'
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { File, PlusCircle } from "lucide-react"

type Props = {
    title: string,
    description: string
    addButton: boolean
    buttons: boolean
    onClick?: () => void
}

const Header = ({ title, description, addButton, buttons, onClick }: Props) => {
    return (
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
            <div className="flex flex-col gap-2">
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </div>

            {buttons && (
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Exportar
                        </span>
                    </Button>
                    {addButton && (
                        <Button onClick={onClick} size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Adicionar
                            </span>
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Header