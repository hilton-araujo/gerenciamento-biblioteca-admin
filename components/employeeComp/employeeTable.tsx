import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconButton, Paper, TableContainer } from "@mui/material";
import { Book } from '@/model/book';
import { AlertCircle, Eye, FileEdit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FiltesPag from '../filters/filter';

interface Props {
    employees: any;
    isLoading: boolean;
}

const columns = [
    { name: "Código", uid: "code" },
    { name: "Nome", uid: "name" },
    { name: "Apelido", uid: "surname" },
    { name: "Genero", uid: "genre" },
    { name: "Função", uid: "position" },
    { name: "E-mail", uid: "email" },
    { name: "Contacto", uid: "msidn" },
    { name: "Nuit", uid: "nuit" },
    { name: "Tipo de documento", uid: "documentType" },
    { name: "Número de Documento", uid: "documentNumber" },
    { name: "Status", uid: "active" },
    { name: "Ações", uid: "actions" },
];

const EmployeeTable = ({ employees, isLoading }: Props) => {
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

    const filteredEmployee = employees.filter((employee: any) =>
        (employee.code?.includes(searchTerm) ?? false) ||
        (employee.name?.toLowerCase().includes(searchTerm) ?? false)
    );

    const paginatedEmployee = filteredEmployee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div className="flex flex-col w-full mt-4 mb-2">
            <div>
                <FiltesPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredEmployee.length}
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
                            paginatedEmployee?.length > 0 ? (
                                paginatedEmployee?.map((employee: any) => (
                                    <TableRow key={employee.code} className="hover:bg-gray-50">
                                        <TableCell>{employee.code}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.surname}</TableCell>
                                        <TableCell>{employee.genre}</TableCell>
                                        <TableCell>{employee.position}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.msidn}</TableCell>
                                        <TableCell>{employee.nuit}</TableCell>
                                        <TableCell>{employee.documentType}</TableCell>
                                        <TableCell>{employee.documentNumber}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-white text-sm ${employee.active
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                    }`}
                                            >
                                                {employee.active ? "Ativo" : "Inativo"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <IconButton className="text-green-500 hover:text-green-700">
                                                    <Eye size={18} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/employee/${employee.code}`)}
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

export default EmployeeTable