import Link from "next/link"
import { Button } from "@/components//shared/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components//shared/ui/card"
// import { Badge } from "@/components/shared/ui/badge"
import { ArrowLeft, Check, Users, X } from "lucide-react"
import { Separator } from "@/components/shared//ui/separator"
import { PageHeader } from "@/components/app-header"

export default function PedidoDetalhesPage({ params }: { params: { code: string } }) {
    // Em uma aplicação real, buscaríamos os dados do banco de dados
    const pedido = {
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
                status: "pendente",
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
                status: "pendente",
            },
        ],
    }

    // Função para determinar a cor do badge de status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "pendente":
                return "bg-yellow-500 hover:bg-yellow-600"
            case "aprovado":
                return "bg-green-500 hover:bg-green-600"
            case "rejeitado":
                return "bg-red-500 hover:bg-red-600"
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
            default:
                return status
        }
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
                                            {/* <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge> */}
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
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{livro.titulo}</h3>
                                                        <p className="text-sm text-muted-foreground">{livro.autor}</p>
                                                        <p className="mt-1 text-sm">
                                                            ID: {livro.id} · Status:
                                                            {/* <Badge className={`ml-2 ${getStatusColor(livro.status)}`}>
                            {getStatusText(livro.status)}
                          </Badge> */}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                                                        >
                                                            <Check className="w-4 h-4 mr-1" />
                                                            Aprovar
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
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
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Rejeitar Todos</Button>
                                    <Button>Aprovar Todos</Button>
                                </CardFooter>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Atualizar Status do Pedido</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Após avaliar todos os livros, atualize o status geral do pedido. O status pode ser atualizado
                                        automaticamente com base nas decisões individuais.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                                            <X className="w-4 h-4 mr-2" />
                                            Rejeitar Pedido
                                        </Button>
                                        <Button className="bg-green-500 hover:bg-green-600">
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