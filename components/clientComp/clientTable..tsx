import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconButton, Paper, TableContainer } from "@mui/material";
import { AlertCircle, Eye, FileEdit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FiltesPag from '../filters/filter';
import { Client } from '@/model/client';

type Props = {
    clients: Client[]
    isLoading: boolean
}

const columns = [
    { name: "Código", uid: "code" },
    { name: "Nome", uid: "name" },
    { name: "Apelido", uid: "surname" },
    { name: "Nuit", uid: "nuit" },
    { name: "N de Documento", uid: "documentNumber" },
    { name: "Email", uid: "email" },
    { name: "Cotacto", uid: "phone" },
    { name: "Endereço", uid: "address" },
    { name: "Cidade", uid: "city" },
    { name: "Codigo Postal", uid: "postalCode" },
    { name: "Estado", uid: "active" },
    { name: "Ações", uid: "actions" },
];

const ClientTable = ({ clients, isLoading }: Props) => {
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

    const filteredClients = clients.filter((book: Client) =>
        (book.name?.toLowerCase().includes(searchTerm) ?? false)
    );

    const paginatedClients = filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-col w-full mt-4 mb-2">
            <div>
                <FiltesPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredClients.length}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead className={`${column.uid === "actions" ? "text-right" : "text-center"}`} key={column.uid}>{column.name}</TableHead>
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
                            paginatedClients?.length > 0 ? (
                                paginatedClients?.map((client: Client) => (
                                    <TableRow key={client.code} className="hover:bg-gray-50">
                                        <TableCell>{client.code}</TableCell>
                                        <TableCell>{client.name}</TableCell>
                                        <TableCell>{client.surname}</TableCell>
                                        <TableCell>{client.nuit}</TableCell>
                                        <TableCell>{client.documentNumber}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.phone}</TableCell>
                                        <TableCell>{client.address}</TableCell>
                                        <TableCell>{client.city}</TableCell>
                                        <TableCell>{client.postalCode}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-white text-sm ${client.active
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {client.active ? "Ativo" : "Inativo"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <IconButton className="text-green-500 hover:text-green-700">
                                                    <Eye size={18} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/client/${client.code}`)}
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
                                            <span className="ml-2 mt-2">CLIENTE NÃO ENCONTRADO</span>
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

export default ClientTable