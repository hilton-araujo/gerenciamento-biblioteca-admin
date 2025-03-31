import {
    Book,
    FolderOpen,
    Home,
    List,
    ListOrdered,
    Plus,
    Users,
} from "lucide-react";

export const navbarConfig = [
    {
        title: "Inicio",
        href: "/admin",
        icon: <Home className="w-5 h-5" />,
    },
    {
        title: "Funcionário",
        href: "/admin/employee",
        icon: <Users className="w-5 h-5" />,
    },
    {
        title: "Cliente",
        href: "/admin/client",
        icon: <Users className="w-5 h-5" />,
    },
    {
        title: "Categoria",
        href: "/admin/category",
        icon: <FolderOpen className="w-5 h-5" />,
    },
    {
        title: "Livro",
        href: "/admin/book",
        icon: <Book className="w-5 h-5" />,
    },
    {
        title: "Tipo de Pedido",
        href: "/admin/order-type",
        icon: <List className="w-5 h-5" />,
    },
    {
        title: "Pedido",
        href: "/admin/order",
        icon: <ListOrdered className="w-5 h-5" />,
    },
    {
        title: "Workflow",
        href: "/admin/workflow",
        icon: <Plus className="w-5 h-5" />,
    },
];
