import React from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/shared/ui/data-table';
import { IconButton } from '@mui/material'
import { Eye, FileEdit, Users } from 'lucide-react'
import { PageHeader } from '@/components/app-header';
type Props = {
    clients: any
    isLoading: boolean
}


const ListClient = ({ clients, isLoading }: Props) => {
    const navigate = useRouter()

    const columns = [
        { header: "Código", accessorKey: "code" },
        { header: "Nome", accessorKey: "name" },
        { header: "Apelido", accessorKey: "surname" },
        { header: "Nuit", accessorKey: "nuit" },
        { header: "N de Documento", accessorKey: "documentNumber" },
        { header: "Email", accessorKey: "email" },
        { header: "Cotacto", accessorKey: "phone" },
        { header: "Endereço", accessorKey: "address" },
        { header: "Cidade", accessorKey: "city" },
        { header: "Codigo Postal", accessorKey: "postalCode" },
        {
            header: "Estado",
            accessorKey: "active",
            cell: (book: any) => (
                <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${book.active
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                >
                    {book.active ? "Ativo" : "Inativo"}
                </span>
            ),
        },
    ];

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader title="Gerenciamento de Clientes" description="Gerenciar de clientes da biblioteca" icon={Users} />

                    <DataTable
                        data={clients}
                        columns={columns}
                        title="Clientes"
                        addUrl="client/add"
                        isLoading={isLoading}
                        actions={(client) => (
                            <div className="flex items-end justify-end gap-2">
                                <IconButton className="text-green-500 hover:text-green-700"
                                    onClick={() => navigate.push(`/admin/client/${client.nuit}/details`)}>
                                    <Eye size={18} />
                                </IconButton>
                                <IconButton
                                    onClick={() => navigate.push(`/admin/client/${client.nuit}`)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FileEdit size={18} />
                                </IconButton>
                            </div>
                        )}
                    />
                </main>
            </div>
        </div>
    )
}

export default ListClient