"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { ArrowLeft, Check, Users, X } from "lucide-react"
import { Separator } from "@/components/shared/ui/separator"
import { Badge } from "@/components/shared/ui/badge"
import { toast } from "@/hooks/use-toast"

// Types for our data model
type BookStatus = "pendente" | "aprovado" | "rejeitado"
type OrderStatus = "pendente" | "aprovado" | "rejeitado" | "parcial"

interface Book {
    id: string
    titulo: string
    autor: string
    status: BookStatus
}

interface Customer {
    id: string
    nome: string
    email: string
    telefone: string
}

interface Order {
    id: string
    cliente: Customer
    data: string
    status: OrderStatus
    livros: Book[]
}

// Component for the page header
const PageHeader = ({
    title,
    description,
    icon: Icon,
    backUrl,
}: {
    title: string
    description: string
    icon: React.ElementType
    backUrl: string
}) => (
    <div className="flex flex-col gap-1 pb-6">
        <div className="flex items-center gap-2">
            <Link
                href={backUrl}
                className="inline-flex items-center justify-center text-sm font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Voltar</span>
            </Link>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                {Icon && <Icon className="w-6 h-6" />}
                {title}
            </h1>
        </div>
        {description && <p className="text-muted-foreground">{description}</p>}
    </div>
)

export default function OrderDetailsPage({ params }: { params: { code: string } }) {
    // Em uma aplicação real, buscaríamos os dados do banco de dados
    const initialOrder: Order = {
        id: params.code,
        cliente: {
            id: "CLI-001",
            nome: "João Silva",
            email: "joao.silva@exemplo.com",
            telefone: "(11) 98765-4321",
        },
        data: "15/03/2025",
        status: "pendente",
        livros: [
            {
                id: "LIV-001",
                titulo: "Dom Casmurro",
                autor: "Machado de Assis",
                status: "aprovado",
            },
            {
                id: "LIV-002",
                titulo: "O Cortiço",
                autor: "Aluísio Azevedo",
                status: "pendente",
            },
            {
                id: "LIV-003",
                titulo: "Memórias Póstumas de Brás Cubas",
                autor: "Machado de Assis",
                status: "rejeitado",
            },
        ],
    }

    // Estado para gerenciar os dados do pedido
    const [pedido, setPedido] = useState<Order>(initialOrder)

    // Função para determinar a cor do badge de status
    const getStatusColor = (status: BookStatus | OrderStatus) => {
        switch (status) {
            case "pendente":
                return "bg-yellow-500 hover:bg-yellow-600"
            case "aprovado":
                return "bg-green-500 hover:bg-green-600"
            case "rejeitado":
                return "bg-red-500 hover:bg-red-600"
            case "parcial":
                return "bg-blue-500 hover:bg-blue-600"
            default:
                return "bg-gray-500 hover:bg-gray-600"
        }
    }

    // Função para traduzir o status
    const getStatusText = (status: BookStatus | OrderStatus) => {
        switch (status) {
            case "pendente":
                return "Pendente"
            case "aprovado":
                return "Aprovado"
            case "rejeitado":
                return "Rejeitado"
            case "parcial":
                return "Parcialmente Aprovado"
            default:
                return status
        }
    }

    // Função para atualizar o status de um livro
    const updateBookStatus = (bookId: string, newStatus: BookStatus) => {
        const updatedBooks = pedido.livros.map((livro) => (livro.id === bookId ? { ...livro, status: newStatus } : livro))

        // Atualiza os livros e recalcula o status geral do pedido
        setPedido((prev) => {
            const updatedOrder = { ...prev, livros: updatedBooks }
            updatedOrder.status = calculateOrderStatus(updatedBooks)
            return updatedOrder
        })

        toast({
            title: `Livro ${newStatus === "aprovado" ? "aprovado" : "rejeitado"} com sucesso`,
            description: `O status do livro foi atualizado para ${getStatusText(newStatus)}.`,
        })
    }

    // Função para calcular o status geral do pedido com base nos livros
    const calculateOrderStatus = (books: Book[]): OrderStatus => {
        const approvedCount = books.filter((book) => book.status === "aprovado").length
        const rejectedCount = books.filter((book) => book.status === "rejeitado").length
        const totalBooks = books.length

        if (approvedCount === totalBooks) return "aprovado"
        if (rejectedCount === totalBooks) return "rejeitado"
        if (approvedCount > 0 || rejectedCount > 0) return "parcial"
        return "pendente"
    }

    // Função para aprovar ou rejeitar todos os livros
    const updateAllBooks = (newStatus: BookStatus) => {
        const updatedBooks = pedido.livros.map((livro) => ({ ...livro, status: newStatus }))

        setPedido((prev) => ({
            ...prev,
            livros: updatedBooks,
            status: newStatus === "aprovado" ? "aprovado" : "rejeitado",
        }))

        toast({
            title: `Todos os livros foram ${newStatus === "aprovado" ? "aprovados" : "rejeitados"}`,
            description: `O status de todos os livros foi atualizado para ${getStatusText(newStatus)}.`,
        })
    }

    // Função para atualizar o status geral do pedido
    const updateOrderStatus = (newStatus: OrderStatus) => {
        setPedido((prev) => ({ ...prev, status: newStatus }))

        toast({
            title: `Pedido ${newStatus === "aprovado" ? "aprovado" : "rejeitado"} com sucesso`,
            description: `O status do pedido foi atualizado para ${getStatusText(newStatus)}.`,
        })
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader
                        title={`Detalhes do Pedido ${pedido.id}`}
                        description="Visualize e gerencie os detalhes deste pedido"
                        icon={Users}
                        backUrl="../order"
                    />

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações do Pedido</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">ID do Pedido</div>
                                            <div>{pedido.id}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">Data</div>
                                            <div>{pedido.data}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">Status</div>
                                            <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Informações do Cliente</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">Nome</div>
                                            <div>{pedido.cliente.nome}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">Email</div>
                                            <div>{pedido.cliente.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-muted-foreground">Telefone</div>
                                            <div>{pedido.cliente.telefone}</div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/clientes/${pedido.cliente.id}`} className="w-full">
                                        <Button variant="outline" className="w-full">
                                            Ver Perfil do Cliente
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>

                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Livros Solicitados</CardTitle>
                                    <CardDescription>Aprove ou rejeite cada livro individualmente</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {pedido.livros.map((livro, index) => (
                                            <div key={livro.id}>
                                                {index > 0 && <Separator className="my-4" />}
                                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                                    <div>
                                                        <h3 className="font-medium">{livro.titulo}</h3>
                                                        <p className="text-sm text-muted-foreground">{livro.autor}</p>
                                                        <p className="mt-1 text-sm">
                                                            ID: {livro.id} · Status:
                                                            <Badge className={`ml-2 ${getStatusColor(livro.status)}`}>
                                                                {getStatusText(livro.status)}
                                                            </Badge>
                                                        </p>
                                                    </div>
                                                    <div className="flex self-end space-x-2 sm:self-start">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={`${livro.status === "aprovado"
                                                                    ? "bg-green-500 text-white"
                                                                    : "text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                                                                }`}
                                                            onClick={() => updateBookStatus(livro.id, "aprovado")}
                                                        >
                                                            <Check className="w-4 h-4 mr-1" />
                                                            Aprovar
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={`${livro.status === "rejeitado"
                                                                    ? "bg-red-500 text-white"
                                                                    : "text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                                                }`}
                                                            onClick={() => updateBookStatus(livro.id, "rejeitado")}
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            Rejeitar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col justify-between gap-2 sm:flex-row">
                                    <Button variant="outline" onClick={() => updateAllBooks("rejeitado")} className="w-full sm:w-auto">
                                        Rejeitar Todos
                                    </Button>
                                    <Button onClick={() => updateAllBooks("aprovado")} className="w-full sm:w-auto">
                                        Aprovar Todos
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Atualizar Status do Pedido</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Após avaliar todos os livros, atualize o status geral do pedido. O status atual é calculado
                                        automaticamente com base nas decisões individuais, mas você pode alterá-lo manualmente.
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Button
                                            variant="outline"
                                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                                            onClick={() => updateOrderStatus("rejeitado")}
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Rejeitar Pedido
                                        </Button>
                                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => updateOrderStatus("aprovado")}>
                                            <Check className="w-4 h-4 mr-2" />
                                            Aprovar Pedido
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

