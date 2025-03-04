import React from 'react'
import { useRouter } from 'next/navigation';
import { Eye, FileEdit, Users } from 'lucide-react';
import { IconButton } from '@mui/material';
import { PageHeader } from '@/components/common/app-header';
import { DataTable } from '@/components/shared/ui/data-table';

interface Props {
    employees: any;
    isLoading: boolean;
}

const ListEmployee = ({ employees, isLoading }: Props) => {
    const navigate = useRouter()

    const columns = [
        { header: "Código", accessorKey: "code" },
        { header: "Nome", accessorKey: "name" },
        { header: "Apelido", accessorKey: "surname" },
        { header: "Genero", accessorKey: "genre" },
        { header: "Nuit", accessorKey: "nuit" },
        { header: "Tipo de documento", accessorKey: "documentType" },
        { header: "N de documento", accessorKey: "documentNumber" },
        { header: "Email", accessorKey: "email" },
        { header: "Cotacto", accessorKey: "msidn" },
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
                    <PageHeader title="Gerenciamento de Funcionários" description="Gerenciar de funcionários da biblioteca" icon={Users} />

                    <DataTable
                        data={employees}
                        columns={columns}
                        title="Funcionários"
                        addUrl="employee/add"
                        isLoading={isLoading}
                        actions={(employee) => (
                            <div className="flex items-end justify-end gap-2">
                                <IconButton className="text-green-500 hover:text-green-700">
                                    <Eye size={18} />
                                </IconButton>
                                <IconButton
                                    onClick={() => navigate.push(`/admin/employee/${employee.nuit}`)}
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

export default ListEmployee