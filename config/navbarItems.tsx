import {
    Book,
    FileBarChart,
    Home,
    Plus,
    Users,
} from "lucide-react";

export const navbarConfig = [
    {
        title: "Inicio",
        href: "/admin",
        icon: <Home className="h-5 w-5" />,
    },
    {
        title: "Funcionário",
        href: "/admin/employee",
        icon: <Users className="h-5 w-5" />,
    },
    {
        title: "Cliente",
        href: "/admin/client",
        icon: <Users className="h-5 w-5" />,
    },
    {
        title: "Categoria",
        href: "/admin/category",
        icon: <FileBarChart className="h-5 w-5" />,
    },
    {
        title: "Livro",
        href: "/admin/book",
        icon: <Book className="h-5 w-5" />,
    },
    {
        title: "Workflow",
        href: "/admin/workflow",
        icon: <Plus className="h-5 w-5" />,
    },
];
