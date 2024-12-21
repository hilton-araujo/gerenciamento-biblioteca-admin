import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconButton, Paper, TableContainer } from "@mui/material";
import { Book } from '@/model/book';
import { AlertCircle, Eye, FileEdit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FiltesPag from '../filters/filter';

type Props = {
    books: Book[]
    isLoading: boolean
}

const columns = [
    { name: "Código", uid: "id" },
    { name: "Título", uid: "title" },
    { name: "Autor", uid: "author" },
    { name: "Gênero", uid: "genre" },
    { name: "Ano de Publicação", uid: "publishYear" },
    { name: "Quantidade Disponível", uid: "availableQuantity" },
    { name: "Ações", uid: "actions" },
];

const BookTable = ({ books, isLoading }: Props) => {
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

    const filteredBooks = books.filter((book: Book) =>
        (book.title?.toLowerCase().includes(searchTerm) ?? false) ||
        (book?.author?.toLowerCase().includes(searchTerm) ?? false)
    );

    const paginatedBooks = filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-col w-full mt-4 mb-2">
            <div>
                <FiltesPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredBooks.length}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.uid}>{column.name}</TableHead>
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
                            paginatedBooks?.length > 0 ? (
                                paginatedBooks?.map((book: Book) => (
                                    <TableRow key={book.id} className="hover:bg-gray-50">
                                        <TableCell>{book.id}</TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>{book.publishYear}</TableCell>
                                        <TableCell>{book.availableQuantity}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <IconButton className="text-green-500 hover:text-green-700">
                                                    <Eye size={18} />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/book/${book.id}`)}
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
                                            <span className="ml-2 mt-2">LIVRO NÃO ENCONTRADO</span>
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

export default BookTable