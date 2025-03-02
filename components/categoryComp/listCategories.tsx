import React from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '../app-header'
import { DataTable } from '../ui/data-table'
import { Eye, FileEdit, FolderOpen } from 'lucide-react'
import { IconButton } from '@mui/material'

type Props = {
    categories: any
    isLoading: boolean
}

const ListCategories = ({ categories, isLoading }: Props) => {
    const navigate = useRouter()

    const columns = [
        { header: "Código", accessorKey: "code" },
        { header: "Categoria", accessorKey: "category" },
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
                    <PageHeader title="Gerenciamento de Categorias" description="Gerenciar a coleção de categorias da biblioteca" icon={FolderOpen} />

                    <DataTable
                        data={categories}
                        columns={columns}
                        title="Categorias"
                        addUrl="category/add"
                        isLoading={isLoading}
                        actions={(category) => (
                            <div className="flex items-end justify-end gap-2">
                                <IconButton className="text-green-500 hover:text-green-700">
                                    <Eye size={18} />
                                </IconButton>
                                <IconButton
                                    onClick={() => navigate.push(`/admin/category/${category.code}`)}
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

export default ListCategories