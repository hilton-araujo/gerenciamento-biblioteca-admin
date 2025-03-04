"use client"
import { Book, BookOpen, Home, Library, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card";
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
    Legend,
} from "recharts";
import { FC } from "react";
import { PageHeader } from "@/components/app-header";
import { StatsCard } from "@/components/shared/ui/stats-card";

const BOOK_CATEGORIES = [
    { name: "Fiction", value: 400, color: "#8884d8" },
    { name: "Science", value: 300, color: "#82ca9d" },
    { name: "History", value: 300, color: "#ffc658" },
    { name: "Biography", value: 200, color: "#ff8042" },
    { name: "Self-Help", value: 100, color: "#0088fe" },
];

const MONTHLY_BOOKS = [
    { name: "Jan", borrowed: 65, returned: 55 },
    { name: "Feb", borrowed: 59, returned: 49 },
    { name: "Mar", borrowed: 80, returned: 72 },
    { name: "Apr", borrowed: 81, returned: 78 },
    { name: "May", borrowed: 56, returned: 50 },
    { name: "Jun", borrowed: 55, returned: 42 },
    { name: "Jul", borrowed: 40, returned: 35 },
];

const Dashboard: FC = () => {
    return (
        <>
            <PageHeader
                title="Dashboard"
                description="Library management system overview"
                icon={Home}
            />

            <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
                <StatsCard
                    title="Total Books"
                    value="12,543"
                    description="Book collection size"
                    icon={Book}
                    trend="up"
                    trendValue="2.5% from last month"
                />
                <StatsCard
                    title="Available Books"
                    value="11,024"
                    description="Books currently available"
                    icon={BookOpen}
                />
                <StatsCard
                    title="Active Customers"
                    value="1,432"
                    description="Registered library members"
                    icon={Users}
                    trend="up"
                    trendValue="4.3% from last month"
                />
                <StatsCard
                    title="Borrowed Books"
                    value="1,519"
                    description="Books currently borrowed"
                    icon={Library}
                />
            </div>

            <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <CardHeader>
                        <CardTitle>Monthly Activity</CardTitle>
                        <CardDescription>Book borrowing and returns over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={MONTHLY_BOOKS}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="borrowed" fill="#8884d8" name="Borrowed" />
                                    <Bar dataKey="returned" fill="#82ca9d" name="Returned" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <CardHeader>
                        <CardTitle>Book Categories</CardTitle>
                        <CardDescription>Distribution of books by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={BOOK_CATEGORIES}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {BOOK_CATEGORIES.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 pb-3 border-b last:border-0">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">John Doe borrowed "The Great Gatsby"</p>
                                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <CardHeader>
                        <CardTitle>Popular Books</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center pb-3 border-b last:border-0">
                                    <div className="mr-auto font-medium">
                                        <div>To Kill a Mockingbird</div>
                                        <div className="text-sm text-muted-foreground">Harper Lee</div>
                                    </div>
                                    <div className="ml-4 text-sm text-muted-foreground">
                                        {Math.floor(Math.random() * 100)} borrows
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-fade-in md:col-span-2 xl:col-span-1" style={{ animationDelay: "0.5s" }}>
                    <CardHeader>
                        <CardTitle>Staff on Duty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Alice Johnson", role: "Head Librarian", status: "Available" },
                                { name: "Robert Smith", role: "Assistant Librarian", status: "Busy" },
                                { name: "Emily Davis", role: "Cataloging Specialist", status: "On Break" },
                                { name: "Michael Wilson", role: "IT Support", status: "Available" },
                            ].map((staff, i) => (
                                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                            <span className="font-medium text-primary">
                                                {staff.name.split(" ").map(n => n[0]).join("")}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{staff.name}</p>
                                            <p className="text-sm text-muted-foreground">{staff.role}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${staff.status === "Available"
                                                ? "bg-green-100 text-green-800"
                                                : staff.status === "Busy"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                                        >
                                            {staff.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Dashboard