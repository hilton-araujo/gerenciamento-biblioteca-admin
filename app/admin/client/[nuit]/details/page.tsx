"use client"

import { Badge } from "@/components/shared/ui/badge"
import { Button } from "@/components/shared/ui/button"
import { Card, CardContent, CardFooter } from "@/components/shared/ui/card"
import { Input } from "@/components/shared/ui/input"
import { Separator } from "@/components/shared/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import {
    ArrowUpDown,
    Calendar,
    ChevronDown,
    ChevronUp,
    Clock,
    Download,
    FileText,
    Filter,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    Settings,
    User,
} from "lucide-react"
import { JSX, useState } from "react"

// Mock data for the client
const clientData = {
    code: "7674799",
    name: "Hilton",
    surname: "Araújo",
    nuit: "637468263",
    documentNumber: "96587425366F",
    email: "hiltoneduardoaraujo@gmail.com",
    phone: "853167957",
    address: "Rua da Primavera",
    city: "Maputo",
    postalCode: "3235",
    active: true,
    orders: [
        {
            id: "8c35995a-ac7e-4303-915e-24dc14cb10d1",
            code: "3510204",
            designation: "Pedido de Livro para emprestimo",
            description: "Pedido de Livro para emprestimo",
            clientName: "Hilton",
            clientSurname: "Araújo",
            orderType: "Pedido de Emprestimo de livro",
            orderDate: "2025-03-19T20:57:49.621319",
            orderStatus: "PEDENTE",
            bookSize: 0,
            orderBooks: [],
        },
        {
            id: "8d50df88-bca1-460f-bf00-8b3c1a67376d",
            code: "4438210",
            designation: "Pedido de Livro para emprestimo",
            description: "Pedido de Livro para emprestimo",
            clientName: "Hilton",
            clientSurname: "Araújo",
            orderType: "Pedido de Emprestimo de livro",
            orderDate: "2025-03-19T21:05:10.199448",
            orderStatus: "PEDENTE",
            bookSize: 0,
            orderBooks: [],
        },
        {
            id: "9dd03426-f353-40e1-a425-4f41342a6b16",
            code: "9578209",
            designation: "Pedido de Livro para emprestimo",
            description: "Pedido de Livro para emprestimo",
            clientName: "Hilton",
            clientSurname: "Araújo",
            orderType: "Pedido de Emprestimo de livro",
            orderDate: "2025-03-19T21:07:39.832637",
            orderStatus: "PEDENTE",
            bookSize: 2,
            orderBooks: [
                {
                    code: "6548756",
                    bookName: "Teste",
                    orderBookStatus: "PEDIDO_NEGADO",
                },
                {
                    code: "7364958",
                    bookName: "Testado",
                    orderBookStatus: "PEDIDO_APROVADO",
                },
            ],
        },
        {
            id: "af6f921f-b254-423d-8d92-79c71a4c88aa",
            code: "3716016",
            designation: "Pedido de Livro para emprestimo",
            description: "Pedido de Livro para emprestimo",
            clientName: "Hilton",
            clientSurname: "Araújo",
            orderType: "Pedido de Emprestimo de livro",
            orderDate: "2025-03-19T20:50:21.158498",
            orderStatus: "PEDENTE",
            bookSize: 0,
            orderBooks: [],
        },
    ],
}

export default function ClientDashboard() {
    const [searchQuery, setSearchQuery] = useState("")

    // Calculate statistics
    const totalOrders = clientData.orders.length
    const pendingOrders = clientData.orders.filter((o) => o.orderStatus === "PEDENTE").length
    const totalBooks = clientData.orders.reduce((acc, order) => acc + order.bookSize, 0)
    const lastOrderDate = new Date(
        Math.max(...clientData.orders.map((o) => new Date(o.orderDate).getTime())),
    ).toLocaleDateString()

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="bg-white border-b shadow-sm">
                <div className="container px-4 py-6 mx-auto">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-md bg-gradient-to-br from-primary to-primary/70">
                                <span className="text-xl font-bold">
                                    {clientData.name.charAt(0)}
                                    {clientData.surname.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold">
                                        {clientData.name} {clientData.surname}
                                    </h1>
                                    <Badge variant={clientData.active ? "success" : "destructive"} className="h-6">
                                        {clientData.active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-muted-foreground">
                                    <span>Client #{clientData.code}</span>
                                    <span>•</span>
                                    <span>{clientData.city}</span>
                                    <span>•</span>
                                    <span>NUIT: {clientData.nuit}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" size="sm" className="h-9">
                                <Mail className="w-4 h-4 mr-2" />
                                Email
                            </Button>
                            <Button variant="outline" size="sm" className="h-9">
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container px-4 py-8 mx-auto">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Orders"
                        value={totalOrders.toString()}
                        icon={<FileText className="w-5 h-5" />}
                        trend="+12% from last month"
                        trendUp={true}
                    />
                    <StatCard
                        title="Pending Orders"
                        value={pendingOrders.toString()}
                        icon={<Clock className="w-5 h-5" />}
                        color="warning"
                        trend="-5% from last month"
                        trendUp={false}
                    />
                    <StatCard
                        title="Books Requested"
                        value={totalBooks.toString()}
                        icon={<FileText className="w-5 h-5" />}
                        trend="+8% from last month"
                        trendUp={true}
                    />
                    <StatCard title="Last Order" value={lastOrderDate} icon={<Calendar className="w-5 h-5" />} color="info" />
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        <TabsList className="w-full sm:w-auto">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="details">Client Details</TabsTrigger>
                        </TabsList>

                        <div className="relative w-full sm:w-64 lg:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Client Summary Card */}
                            <Card className="overflow-hidden border-0 shadow-md lg:col-span-1">
                                <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5">
                                    <h3 className="font-semibold">Client Information</h3>
                                </div>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                {clientData.name} {clientData.surname}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{clientData.email}</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span>{clientData.phone}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                            <span>
                                                {clientData.address}, {clientData.city} {clientData.postalCode}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            <span>NUIT: {clientData.nuit}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span>Doc: {clientData.documentNumber}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-6 py-3 border-t bg-muted/30">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Edit Information
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Recent Orders Summary */}
                            <Card className="overflow-hidden border-0 shadow-md lg:col-span-2">
                                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5">
                                    <h3 className="font-semibold">Recent Orders</h3>
                                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                                        <span>View All</span>
                                        <ChevronDown className="w-3 h-3" />
                                    </Button>
                                </div>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {clientData.orders.slice(0, 3).map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-3 transition-colors border rounded-lg bg-card hover:bg-accent/5"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{order.designation}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Badge variant="outline" className="font-mono">
                                                                {order.code}
                                                            </Badge>
                                                            <span>•</span>
                                                            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <StatusBadge status={order.orderStatus} />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between px-6 py-3 border-t bg-muted/30">
                                    <span className="text-sm text-muted-foreground">Showing 3 of {clientData.orders.length} orders</span>
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Download className="w-3 h-3 mr-2" />
                                        Export
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Order Activity Chart */}
                            <Card className="overflow-hidden border-0 shadow-md lg:col-span-3">
                                <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5">
                                    <h3 className="font-semibold">Order Activity</h3>
                                </div>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center h-64">
                                        <div className="space-y-3 text-center">
                                            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-muted">
                                                <FileText className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">Order Activity Chart</h4>
                                                <p className="text-sm text-muted-foreground">Visualize order trends and patterns over time</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Generate Report
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <Card className="overflow-hidden border-0 shadow-md">
                            <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="font-semibold">Order History</h3>
                                        <p className="text-sm text-muted-foreground">Showing {clientData.orders.length} orders</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8">
                                            <Filter className="w-3 h-3 mr-2" />
                                            Filter
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8">
                                            <ArrowUpDown className="w-3 h-3 mr-2" />
                                            Sort
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8">
                                            <Download className="w-3 h-3 mr-2" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="pt-6">
                                <OrdersList orders={clientData.orders} />
                            </CardContent>
                            <CardFooter className="flex justify-between px-6 py-3 border-t bg-muted/30">
                                <span className="text-sm text-muted-foreground">Showing all {clientData.orders.length} orders</span>
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                    <span className="mx-2 text-sm">1 of 1</span>
                                    <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                                        <ChevronUp className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Client Details Tab */}
                    <TabsContent value="details">
                        <Card className="overflow-hidden border-0 shadow-md">
                            <div className="px-6 py-4 bg-gradient-to-r from-primary/10 to-primary/5">
                                <h3 className="font-semibold">Client Details</h3>
                            </div>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Personal Information</h3>
                                        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-muted/20">
                                            <DetailItem label="Full Name" value={`${clientData.name} ${clientData.surname}`} />
                                            <DetailItem label="Client Code" value={clientData.code} />
                                            <DetailItem label="Document Number" value={clientData.documentNumber} />
                                            <DetailItem label="NUIT" value={clientData.nuit} />
                                            <DetailItem
                                                label="Status"
                                                value={
                                                    <Badge variant={clientData.active ? "success" : "destructive"}>
                                                        {clientData.active ? "Active" : "Inactive"}
                                                    </Badge>
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Contact Information</h3>
                                        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-muted/20">
                                            <DetailItem
                                                label="Email"
                                                value={
                                                    <a href={`mailto:${clientData.email}`} className="text-primary hover:underline">
                                                        {clientData.email}
                                                    </a>
                                                }
                                                icon={<Mail className="w-4 h-4" />}
                                            />
                                            <DetailItem
                                                label="Phone"
                                                value={
                                                    <a href={`tel:${clientData.phone}`} className="text-primary hover:underline">
                                                        {clientData.phone}
                                                    </a>
                                                }
                                                icon={<Phone className="w-4 h-4" />}
                                            />
                                            <DetailItem
                                                label="Address"
                                                value={`${clientData.address}, ${clientData.city}, ${clientData.postalCode}`}
                                                icon={<MapPin className="w-4 h-4" />}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                                        Update Information
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

function DetailItem({ label, value, icon = null }: any) {
    return (
        <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="flex items-center gap-2">
                {icon}
                <div className="font-medium">{value}</div>
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    icon,
    color = "default",
    trend = null,
    trendUp = null,
}: {
    title: string
    value: string
    icon: JSX.Element
    color?: "default" | "success" | "warning" | "danger" | "info"
    trend?: string | null
    trendUp?: boolean | null
}) {
    const colorClasses = {
        default: "from-primary/20 to-primary/5 text-primary",
        success: "from-green-100 to-green-50 text-green-600",
        warning: "from-yellow-100 to-yellow-50 text-yellow-600",
        danger: "from-red-100 to-red-50 text-red-600",
        info: "from-blue-100 to-blue-50 text-blue-600",
    }

    return (
        <div className="p-6 transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4">
                <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {trend && (
                        <p className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"} mt-1 flex items-center gap-1`}>
                            {trendUp ? "↑" : "↓"} {trend}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

function OrdersList({ orders }: any) {
    return (
        <div className="space-y-4">
            <div className="hidden gap-4 px-4 py-2 text-sm font-medium rounded-lg md:grid md:grid-cols-12 bg-muted/30">
                <div className="col-span-2">Order Code</div>
                <div className="col-span-3">Designation</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1"></div>
            </div>

            {orders.map((order: any) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    )
}

function OrderItem({ order }: any) {
    const [isOpen, setIsOpen] = useState(false)

    // Format date
    const formattedDate = new Date(order.orderDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    const formattedTime = new Date(order.orderDate).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <div className="overflow-hidden transition-shadow bg-white border rounded-lg shadow-sm hover:shadow-md">
            <div className="grid items-center grid-cols-1 gap-4 p-4 md:grid-cols-12">
                <div className="flex items-center gap-2 md:col-span-2 md:block">
                    <span className="text-sm font-medium md:hidden">Code:</span>
                    <Badge variant="outline" className="font-mono">
                        {order.code}
                    </Badge>
                </div>

                <div className="flex items-center gap-2 md:col-span-3 md:block">
                    <span className="text-sm font-medium md:hidden">Designation:</span>
                    <span className="font-medium">{order.designation}</span>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 md:block">
                    <span className="text-sm font-medium md:hidden">Date:</span>
                    <div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{formattedTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 md:block">
                    <span className="text-sm font-medium md:hidden">Type:</span>
                    <span className="text-sm">{order.orderType.split(" ").pop()}</span>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 md:block">
                    <span className="text-sm font-medium md:hidden">Status:</span>
                    <StatusBadge status={order.orderStatus} />
                </div>

                <div className="flex justify-end md:col-span-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Collapse details" : "Expand details"}
                        className="hover:bg-primary/10"
                    >
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <>
                    <Separator />
                    <div className="p-4 space-y-4 bg-gradient-to-r from-muted/20 to-transparent">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Order Type</h4>
                                <p>{order.orderType}</p>
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Description</h4>
                                <p>{order.description}</p>
                            </div>
                        </div>

                        {order.bookSize > 0 && (
                            <div>
                                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Books ({order.bookSize})</h4>
                                <div className="p-4 bg-white border rounded-md shadow-sm">
                                    <div className="space-y-3">
                                        {order.orderBooks.map((book: any) => (
                                            <div
                                                key={book.code}
                                                className="flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-muted/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">{book.bookName}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Badge variant="outline" className="font-mono text-xs">
                                                                {book.code}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <BookStatusBadge status={book.orderBookStatus} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                                <Download className="w-3 h-3 mr-2" />
                                Print Order
                            </Button>
                            <Button
                                size="sm"
                                className="h-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                            >
                                View Full Details
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

function StatusBadge({ status }: any) {
    let variant: "default" | "warning" | "success" | "destructive" | "secondary" | "outline" | "info" | null | undefined = "default"
    let label = status

    switch (status) {
        case "PEDENTE":
            variant = "warning"
            label = "Pending"
            break
        case "APROVADO":
            variant = "success"
            label = "Approved"
            break
        case "NEGADO":
            variant = "destructive"
            label = "Denied"
            break
        default:
            variant = "secondary"
    }

    return <Badge variant={variant}>{label}</Badge>
}

function BookStatusBadge({ status }: any) {
    let variant: "default" | "warning" | "success" | "destructive" | "secondary" | "outline" | "info" | null | undefined = "default"

    switch (status) {
        case "PEDIDO_APROVADO":
            variant = "success"
            break
        case "PEDIDO_NEGADO":
            variant = "destructive"
            break
        case "PEDIDO_PENDENTE":
            variant = "warning"
            break
        default:
            variant = "secondary"
    }

    return (
        <Badge variant={variant}>
            {status === "PEDIDO_APROVADO"
                ? "Approved"
                : status === "PEDIDO_NEGADO"
                    ? "Denied"
                    : status === "PEDIDO_PENDENTE"
                        ? "Pending"
                        : status}
        </Badge>
    )
}