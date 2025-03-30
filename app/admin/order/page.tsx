"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/ui/card"
import { Badge } from "@/components/shared/ui/badge"
import { Eye, Filter, Search, SlidersHorizontal, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/shared/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/shared/ui/pagination"

// Types
type OrderStatus = "pendente" | "aprovado" | "rejeitado" | "parcial"

type OrderType =
    | "ALTERACAO"
    | "CANCELAMENTO"
    | "COMPRA"
    | "DEVOLUCAO"
    | "DEVOLUCAO_ATRASADA"
    | "EMPRESTIMO"
    | "PAGAMENTO"
    | "PERSONALIZACAO"
    | "REEMBOLSO"
    | "RENOVACAO_EMPRESTIMO"
    | "REPOSICAO"
    | "RESERVA_ITEM"
    | "RESERVA_SALA"
    | "SUGESTAO_ITEM"
    | "SUGESTAO_MELHORIA"
    | "SUPORTE_TECNICO"

// Update the Order interface to include tipo (type)
interface Order {
    id: string
    cliente: string
    data: string
    livros: number
    status: OrderStatus
    tipo: OrderType
}

// Add a function to get the display name for order types
const getOrderTypeDisplayName = (tipo: OrderType): string => {
    const displayNames = {
        ALTERACAO: "Alteração",
        CANCELAMENTO: "Cancelamento",
        COMPRA: "Compra",
        DEVOLUCAO: "Devolução",
        DEVOLUCAO_ATRASADA: "Devolução atrasada",
        EMPRESTIMO: "Empréstimo",
        PAGAMENTO: "Pagamento",
        PERSONALIZACAO: "Personalização",
        REEMBOLSO: "Reembolso",
        RENOVACAO_EMPRESTIMO: "Renovação de empréstimo",
        REPOSICAO: "Reposição",
        RESERVA_ITEM: "Reserva de item",
        RESERVA_SALA: "Reserva de sala",
        SUGESTAO_ITEM: "Sugestão de item",
        SUGESTAO_MELHORIA: "Sugestão de melhoria",
        SUPORTE_TECNICO: "Suporte técnico",
    }
    return displayNames[tipo]
}

// Component for the page header
const PageHeader = ({
    title,
    description,
    icon: Icon,
}: {
    title: string
    description: string
    icon: React.ElementType
}) => (
    <div className="flex flex-col gap-1 pb-6">
        <div className="flex items-center gap-2">
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                {Icon && <Icon className="w-6 h-6" />}
                {title}
            </h1>
        </div>
        {description && <p className="text-muted-foreground">{description}</p>}
    </div>
)

// Component for status badge
const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const getStatusColor = (status: OrderStatus) => {
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

    const getStatusText = (status: OrderStatus) => {
        switch (status) {
            case "pendente":
                return "Pendente"
            case "aprovado":
                return "Aprovado"
            case "rejeitado":
                return "Rejeitado"
            case "parcial":
                return "Aprovação Parcial"
            default:
                return status
        }
    }

    return <Badge className={getStatusColor(status)}>{getStatusText(status)}</Badge>
}

// Component for status icon
const StatusIcon = ({ status }: { status: OrderStatus }) => {
    switch (status) {
        case "pendente":
            return <Clock className="w-5 h-5 text-yellow-500" />
        case "aprovado":
            return <CheckCircle className="w-5 h-5 text-green-500" />
        case "rejeitado":
            return <XCircle className="w-5 h-5 text-red-500" />
        case "parcial":
            return <AlertCircle className="w-5 h-5 text-blue-500" />
        default:
            return null
    }
}

// Stats card component
const StatsCard = ({
    title,
    value,
    icon: Icon,
    description,
}: {
    title: string
    value: string | number
    icon: React.ElementType
    description?: string
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
)

export default function PedidosPage() {
    // Dados de exemplo - em uma aplicação real, viriam do banco de dados
    const allOrders: Order[] = [
        {
            id: "PED-001",
            cliente: "João Silva",
            data: "15/03/2025",
            livros: 3,
            status: "pendente",
            tipo: "EMPRESTIMO",
        },
        {
            id: "PED-002",
            cliente: "Maria Oliveira",
            data: "14/03/2025",
            livros: 2,
            status: "aprovado",
            tipo: "DEVOLUCAO",
        },
        {
            id: "PED-003",
            cliente: "Carlos Santos",
            data: "13/03/2025",
            livros: 1,
            status: "rejeitado",
            tipo: "COMPRA",
        },
        {
            id: "PED-004",
            cliente: "Ana Pereira",
            data: "12/03/2025",
            livros: 4,
            status: "parcial",
            tipo: "RESERVA_ITEM",
        },
        {
            id: "PED-005",
            cliente: "Roberto Almeida",
            data: "11/03/2025",
            livros: 2,
            status: "pendente",
            tipo: "RENOVACAO_EMPRESTIMO",
        },
        {
            id: "PED-006",
            cliente: "Fernanda Lima",
            data: "10/03/2025",
            livros: 3,
            status: "aprovado",
            tipo: "EMPRESTIMO",
        },
        {
            id: "PED-007",
            cliente: "Paulo Mendes",
            data: "09/03/2025",
            livros: 1,
            status: "rejeitado",
            tipo: "DEVOLUCAO_ATRASADA",
        },
        {
            id: "PED-008",
            cliente: "Luciana Costa",
            data: "08/03/2025",
            livros: 5,
            status: "parcial",
            tipo: "SUGESTAO_ITEM",
        },
    ]

    // State for filters and pagination
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "todos">("todos")
    const [sortBy, setSortBy] = useState<"recentes" | "antigos" | "cliente">("recentes")
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState<OrderStatus | "todos">("todos")

    // Add state for type filter
    const [typeFilter, setTypeFilter] = useState<OrderType | "todos">("todos")

    const itemsPerPage = 6

    // Calculate stats
    const stats = {
        total: allOrders.length,
        pendentes: allOrders.filter((order) => order.status === "pendente").length,
        aprovados: allOrders.filter((order) => order.status === "aprovado").length,
        rejeitados: allOrders.filter((order) => order.status === "rejeitado").length,
    }

    // Filter and sort orders
    const filteredOrders = useMemo(() => {
        let result = [...allOrders]

        // Apply tab filter
        if (activeTab !== "todos") {
            result = result.filter((order) => order.status === activeTab)
        }

        // Apply status filter if different from tab
        if (statusFilter !== "todos" && statusFilter !== activeTab) {
            result = result.filter((order) => order.status === statusFilter)
        }

        // Apply type filter
        if (typeFilter !== "todos") {
            result = result.filter((order) => order.tipo === typeFilter)
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (order) => order.id.toLowerCase().includes(query) || order.cliente.toLowerCase().includes(query),
            )
        }

        // Apply sorting
        switch (sortBy) {
            case "recentes":
                // Assuming the dates are in DD/MM/YYYY format
                result.sort((a, b) => {
                    const dateA = a.data.split("/").reverse().join("")
                    const dateB = b.data.split("/").reverse().join("")
                    return dateB.localeCompare(dateA)
                })
                break
            case "antigos":
                result.sort((a, b) => {
                    const dateA = a.data.split("/").reverse().join("")
                    const dateB = b.data.split("/").reverse().join("")
                    return dateA.localeCompare(dateB)
                })
                break
            case "cliente":
                result.sort((a, b) => a.cliente.localeCompare(b.cliente))
                break
        }

        return result
    }, [allOrders, searchQuery, statusFilter, sortBy, activeTab, typeFilter])

    // Paginate orders
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredOrders, currentPage])

    // Calculate total pages
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Generate pagination items
    const getPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            // Show all pages if there are few
            for (let i = 1; i <= totalPages; i++) {
                items.push(i)
            }
        } else {
            // Show first page, last page, current page, and pages around current
            items.push(1)

            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)

            if (start > 2) items.push(-1) // Add ellipsis

            for (let i = start; i <= end; i++) {
                items.push(i)
            }

            if (end < totalPages - 1) items.push(-2) // Add ellipsis

            items.push(totalPages)
        }

        return items
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-6">
                    <PageHeader title="Pedidos de Livros" description="Gerencie todos os pedidos de empréstimo" icon={Users} />

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <StatsCard
                            title="Total de Pedidos"
                            value={stats.total}
                            icon={Users}
                            description="Todos os pedidos registrados"
                        />
                        <StatsCard title="Pendentes" value={stats.pendentes} icon={Clock} description="Aguardando aprovação" />
                        <StatsCard
                            title="Aprovados"
                            value={stats.aprovados}
                            icon={CheckCircle}
                            description="Prontos para retirada"
                        />
                        <StatsCard title="Rejeitados" value={stats.rejeitados} icon={XCircle} description="Não aprovados" />
                    </div>

                    {/* Tabs and Filters */}
                    <Tabs
                        defaultValue="todos"
                        value={activeTab}
                        onValueChange={(value) => {
                            setActiveTab(value as OrderStatus | "todos")
                            setCurrentPage(1)
                        }}
                    >
                        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
                            <TabsList>
                                <TabsTrigger value="todos">Todos</TabsTrigger>
                                <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                                <TabsTrigger value="aprovado">Aprovados</TabsTrigger>
                                <TabsTrigger value="rejeitado">Rejeitados</TabsTrigger>
                            </TabsList>

                            <div className="flex flex-col w-full gap-2 sm:flex-row sm:w-auto">
                                <div className="relative w-full sm:w-[250px]">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar pedidos..."
                                        className="pl-8"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setCurrentPage(1)
                                        }}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Select
                                        value={statusFilter}
                                        onValueChange={(value) => {
                                            setStatusFilter(value as OrderStatus | "todos")
                                            setCurrentPage(1)
                                        }}
                                    >
                                        <SelectTrigger className="w-[130px]">
                                            <Filter className="w-4 h-4 mr-2" />
                                            <span>Status</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todos">Todos</SelectItem>
                                            <SelectItem value="pendente">Pendentes</SelectItem>
                                            <SelectItem value="aprovado">Aprovados</SelectItem>
                                            <SelectItem value="rejeitado">Rejeitados</SelectItem>
                                            <SelectItem value="parcial">Parciais</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={typeFilter}
                                        onValueChange={(value) => {
                                            setTypeFilter(value as OrderType | "todos")
                                            setCurrentPage(1)
                                        }}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <Filter className="w-4 h-4 mr-2" />
                                            <span>Tipo de Pedido</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todos">Todos os tipos</SelectItem>
                                            <SelectItem value="ALTERACAO">Alteração</SelectItem>
                                            <SelectItem value="CANCELAMENTO">Cancelamento</SelectItem>
                                            <SelectItem value="COMPRA">Compra</SelectItem>
                                            <SelectItem value="DEVOLUCAO">Devolução</SelectItem>
                                            <SelectItem value="DEVOLUCAO_ATRASADA">Devolução atrasada</SelectItem>
                                            <SelectItem value="EMPRESTIMO">Empréstimo</SelectItem>
                                            <SelectItem value="PAGAMENTO">Pagamento</SelectItem>
                                            <SelectItem value="PERSONALIZACAO">Personalização</SelectItem>
                                            <SelectItem value="REEMBOLSO">Reembolso</SelectItem>
                                            <SelectItem value="RENOVACAO_EMPRESTIMO">Renovação de empréstimo</SelectItem>
                                            <SelectItem value="REPOSICAO">Reposição</SelectItem>
                                            <SelectItem value="RESERVA_ITEM">Reserva de item</SelectItem>
                                            <SelectItem value="RESERVA_SALA">Reserva de sala</SelectItem>
                                            <SelectItem value="SUGESTAO_ITEM">Sugestão de item</SelectItem>
                                            <SelectItem value="SUGESTAO_MELHORIA">Sugestão de melhoria</SelectItem>
                                            <SelectItem value="SUPORTE_TECNICO">Suporte técnico</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={sortBy}
                                        onValueChange={(value) => {
                                            setSortBy(value as "recentes" | "antigos" | "cliente")
                                            setCurrentPage(1)
                                        }}
                                    >
                                        <SelectTrigger className="w-[130px]">
                                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                                            <span>Ordenar</span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="recentes">Mais recentes</SelectItem>
                                            <SelectItem value="antigos">Mais antigos</SelectItem>
                                            <SelectItem value="cliente">Por cliente</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <TabsContent value={activeTab} className="mt-0">
                            {paginatedOrders.length > 0 ? (
                                <>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {paginatedOrders.map((pedido) => (
                                            <Card
                                                key={pedido.id}
                                                className="overflow-hidden border-l-4"
                                                style={{
                                                    borderLeftColor:
                                                        pedido.status === "pendente"
                                                            ? "#EAB308"
                                                            : pedido.status === "aprovado"
                                                                ? "#22C55E"
                                                                : pedido.status === "rejeitado"
                                                                    ? "#EF4444"
                                                                    : "#3B82F6",
                                                }}
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <StatusIcon status={pedido.status} />
                                                            <CardTitle>{pedido.id}</CardTitle>
                                                        </div>
                                                        <StatusBadge status={pedido.status} />
                                                    </div>
                                                    <CardDescription className="mt-1.5">Cliente: {pedido.cliente}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div className="text-muted-foreground">Data do Pedido:</div>
                                                        <div>{pedido.data}</div>
                                                        <div className="text-muted-foreground">Tipo de Pedido:</div>
                                                        <div>{getOrderTypeDisplayName(pedido.tipo)}</div>
                                                        <div className="text-muted-foreground">Quantidade de Livros:</div>
                                                        <div>
                                                            {pedido.livros} {pedido.livros === 1 ? "livro" : "livros"}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link href={`order/${pedido.id}`} className="w-full">
                                                        <Button variant="secondary" className="w-full">
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Ver Detalhes
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <Pagination className="mt-8">
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            if (currentPage > 1) handlePageChange(currentPage - 1)
                                                        }}
                                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>

                                                {getPaginationItems().map((page, index) =>
                                                    page < 0 ? (
                                                        <PaginationItem key={`ellipsis-${index}`}>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    ) : (
                                                        <PaginationItem key={page}>
                                                            <PaginationLink
                                                                href="#"
                                                                isActive={page === currentPage}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    handlePageChange(page)
                                                                }}
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    ),
                                                )}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                                        }}
                                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="p-3 mb-4 rounded-full bg-muted">
                                        <Search className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Nenhum pedido encontrado</h3>
                                    <p className="mt-1 text-muted-foreground">Tente ajustar seus filtros ou buscar por outro termo.</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => {
                                            setSearchQuery("")
                                            setStatusFilter("todos")
                                            setTypeFilter("todos")
                                            setActiveTab("todos")
                                            setSortBy("recentes")
                                        }}
                                    >
                                        Limpar filtros
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}