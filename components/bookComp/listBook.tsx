import React from 'react'
import { PageHeader } from '../src/components/page-header'
import { Book, Eye, FileEdit } from 'lucide-react'
import { DataTable } from '../ui/data-table'
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
    props: any
    isLoading: boolean
}

const ListBook = ({ props, isLoading }: Props) => {
    const navigate = useRouter();

    const columns = [
        { header: "Código", accessorKey: "code" },
        { header: "Isbn", accessorKey: "isbn" },
        { header: "Título", accessorKey: "title" },
        { header: "Autor", accessorKey: "author" },
        { header: "Categoria", accessorKey: "category" },
        { header: "Ano de Publicação", accessorKey: "publishYear" },
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
                    <PageHeader title="Gerenciamento de Livros" description="Gerenciar a coleção de livros da biblioteca" icon={Book} />

                    <DataTable
                        data={props}
                        columns={columns}
                        title="Livros"
                        addUrl="book/add"
                        isLoading={isLoading}
                        actions={(book) => (
                            <div className="flex items-end justify-end gap-2">
                                <IconButton className="text-green-500 hover:text-green-700">
                                    <Eye size={18} />
                                </IconButton>
                                <IconButton
                                    onClick={() => navigate.push(`/admin/book/${book.code}`)}
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
    );
};

export default ListBook