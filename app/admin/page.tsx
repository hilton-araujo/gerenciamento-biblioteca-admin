"use client"

import type { FC } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
    AreaChart,
    Area,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, BookMarked, AlertCircle } from "lucide-react"

const mockData = {
    generalStats: {
        totalClients: 1200,
        totalLoans: 845,
        totalBooks: 3250,
        activeLoans: 150,
        overdueLoans: 20,
    },
    monthlyBookLoans: [
        { month: "Jan", borrowedBooks: 120, returnedBooks: 100 },
        { month: "Fev", borrowedBooks: 95, returnedBooks: 85 },
        { month: "Mar", borrowedBooks: 130, returnedBooks: 120 },
        { month: "Abr", borrowedBooks: 150, returnedBooks: 140 },
        { month: "Mai", borrowedBooks: 110, returnedBooks: 100 },
        { month: "Jun", borrowedBooks: 140, returnedBooks: 130 },
        { month: "Jul", borrowedBooks: 160, returnedBooks: 150 },
        { month: "Ago", borrowedBooks: 135, returnedBooks: 125 },
        { month: "Set", borrowedBooks: 100, returnedBooks: 90 },
        { month: "Out", borrowedBooks: 145, returnedBooks: 135 },
        { month: "Nov", borrowedBooks: 125, returnedBooks: 115 },
        { month: "Dez", borrowedBooks: 150, returnedBooks: 140 },
    ],
    topBorrowedBooks: [
        { title: "1984", author: "George Orwell", timesBorrowed: 85 },
        { title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", timesBorrowed: 75 },
        { title: "Dom Casmurro", author: "Machado de Assis", timesBorrowed: 65 },
        { title: "O Alquimista", author: "Paulo Coelho", timesBorrowed: 60 },
        { title: "Orgulho e Preconceito", author: "Jane Austen", timesBorrowed: 55 },
    ],
    genreStats: [
        { name: "Ficção", value: 40 },
        { name: "Não-ficção", value: 30 },
        { name: "Ciência", value: 20 },
        { name: "História", value: 10 },
    ],
    dailyVisitors: [
        { name: "Seg", visitors: 40 },
        { name: "Ter", visitors: 30 },
        { name: "Qua", visitors: 45 },
        { name: "Qui", visitors: 50 },
        { name: "Sex", visitors: 55 },
        { name: "Sáb", visitors: 65 },
        { name: "Dom", visitors: 30 },
    ],
}

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#ec4899"]

const StatCard: FC<{ title: string; value: number; icon: React.ReactNode; description?: string }> = ({
    title,
    value,
    icon,
    description,
}) => (
    <Card className="animate-fade-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
    </Card>
)

const Dashboard: FC = () => {
    const { generalStats, monthlyBookLoans, topBorrowedBooks, genreStats, dailyVisitors } = mockData

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-lg text-muted-foreground">Gestão de Biblioteca - Visão Geral</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total de Clientes"
                        value={generalStats.totalClients}
                        icon={<Users className="h-5 w-5 text-chart-primary" />}
                    />
                    <StatCard
                        title="Total de Livros"
                        value={generalStats.totalBooks}
                        icon={<BookOpen className="h-5 w-5 text-chart-secondary" />}
                    />
                    <StatCard
                        title="Empréstimos Ativos"
                        value={generalStats.activeLoans}
                        icon={<BookMarked className="h-5 w-5 text-chart-tertiary" />}
                    />
                    <StatCard
                        title="Empréstimos Atrasados"
                        value={generalStats.overdueLoans}
                        icon={<AlertCircle className="h-5 w-5 text-destructive" />}
                        description="Ação necessária"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="animate-fade-up [animation-delay:200ms]">
                        <CardHeader>
                            <CardTitle>Empréstimos e Devoluções Mensais</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={monthlyBookLoans}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="borrowedBooks"
                                        stroke="#6366f1"
                                        name="Emprestados"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="returnedBooks"
                                        stroke="#22c55e"
                                        name="Devolvidos"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="animate-fade-up [animation-delay:400ms]">
                        <CardHeader>
                            <CardTitle>Distribuição por Gênero</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={genreStats}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {genreStats.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                className="hover:opacity-80 transition-opacity"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="animate-fade-up [animation-delay:600ms]">
                        <CardHeader>
                            <CardTitle>Visitantes Diários</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={dailyVisitors}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#6366f1"
                                        fill="#6366f1"
                                        fillOpacity={0.2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="animate-fade-up [animation-delay:800ms]">
                        <CardHeader>
                            <CardTitle>Livros Mais Emprestados</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    layout="vertical"
                                    data={topBorrowedBooks}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis type="number" stroke="#6b7280" />
                                    <YAxis
                                        dataKey="title"
                                        type="category"
                                        width={150}
                                        stroke="#6b7280"
                                    />
                                    <Tooltip />
                                    <Bar
                                        dataKey="timesBorrowed"
                                        fill="#6366f1"
                                        radius={[0, 4, 4, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard