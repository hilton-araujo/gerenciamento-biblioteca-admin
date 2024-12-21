import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconButton, Paper, TableContainer } from "@mui/material";
import { AlertCircle, Eye, FileEdit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FiltesPag from '../filters/filter';
import { Category } from '@/model/category';

type Props = {
    categories: Category[]
    isLoading: boolean
}

const columns = [
    { name: "Código", uid: "id" },
    { name: "Genero", uid: "title" },
    { name: "Ações", uid: "actions" },
];

const CategoryTable = ({ categories, isLoading }: Props) => {
    const navigate = useRouter()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredCategories = categories.filter((book: Category) =>
        (book.genero?.toLowerCase().includes(searchTerm) ?? false)
    );

    const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-col w-full mt-4 mb-2">
            <div>
                <FiltesPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredCategories.length}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead className={`${column.uid === "actions" ? "text-end" : ""}`} key={column.uid}>{column.name}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow className="hover:bg-gray-50">
                                <TableCell colSpan={columns.length}>
                                    <div className="flex items-center justify-center h-64">
                                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedCategories?.length > 0 ? (
                                paginatedCategories?.map((genero: Category) => (
                                    <TableRow key={genero.id} className="hover:bg-gray-50">
                                        <TableCell>{genero.id}</TableCell>
                                        <TableCell>{genero.genero}</TableCell>
                                        <TableCell className='flex justify-end'>
                                            <div className="flex items-center gap-2">
                                                <IconButton className="text-green-500 hover:text-green-700">
                                                    <Eye size={18} />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/category/${genero.id}`)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <FileEdit size={18} />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell colSpan={columns.length}>
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <AlertCircle className="h-8 w-8 text-red-400" />
                                            <span className="ml-2 mt-2">CATEGORIA NÃO ENCONTRADO</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CategoryTable