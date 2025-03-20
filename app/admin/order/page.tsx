import Link from "next/link"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shared/ui/card"
// import { Badge } from "@/components/shared/ui/badge"
import { ArrowLeft, Eye, Users } from "lucide-react"
import { PageHeader } from "@/components/common/app-header"

export default function PedidosPage() {
    // Dados de exemplo - em uma aplicação real, viriam do banco de dados
    const pedidos = [
        {
            id: "PED-001",
            cliente: "João Silva",
            data: "15/03/2025",
            livros: 3,
            status: "pendente",
        },
        {
            id: "PED-002",
            cliente: "Maria Oliveira",
            data: "14/03/2025",
            livros: 2,
            status: "aprovado",
        },
        {
            id: "PED-003",
            cliente: "Carlos Santos",
            data: "13/03/2025",
            livros: 1,
            status: "rejeitado",
        },
        {
            id: "PED-004",
            cliente: "Ana Pereira",
            data: "12/03/2025",
            livros: 4,
            status: "parcial",
        },
    ]

    // Função para determinar a cor do badge de status
    const getStatusColor = (status: string) => {
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
    const getStatusText = (status: string) => {
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

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader title="Pedidos de Livros" description="Gerencie todos os pedidos de empréstimo" icon={Users} />

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pedidos.map((pedido) => (
                            <Card key={pedido.id} className="overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle>{pedido.id}</CardTitle>
                                        {/* <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge> */}
                                    </div>
                                    <CardDescription>Cliente: {pedido.cliente}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-muted-foreground">Data do Pedido:</div>
                                        <div>{pedido.data}</div>
                                        <div className="text-muted-foreground">Quantidade de Livros:</div>
                                        <div>{pedido.livros}</div>
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
                </main>
            </div>
        </div>
    )
}