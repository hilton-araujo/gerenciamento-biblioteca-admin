import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconButton, Paper, TableContainer } from "@mui/material";
import { AlertCircle, FileEdit, PowerCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FiltesPag from '@/components/filters/filter';
import { Workflow } from '@/model/workflow';

type Props = {
    workflows: any
    isLoading: boolean
}

const columns = [
    { name: "Código", uid: "code" },
    { name: "Designaçao", uid: "designation" },
    { name: "Descrição", uid: "description" },
    { name: "Tipo de Pedido", uid: "orderType" },
    { name: "Ações", uid: "actions" },
];

const WorkFlowTable = ({ workflows, isLoading }: Props) => {
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

    const filteredWorkflow = workflows.filter((book: Workflow) =>
        (book.code?.includes(searchTerm) ?? false) ||
        (book.designation?.toLowerCase().includes(searchTerm) ?? false)
    );

    const paginatedWorkflow = filteredWorkflow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-col w-full">
            <div>
                <FiltesPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredWorkflow.length}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead className={`${column.uid === "actions" ? "text-right" : ""}`} key={column.uid}>{column.name}</TableHead>
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
                            paginatedWorkflow?.length > 0 ? (
                                paginatedWorkflow?.map((workflow: Workflow) => (
                                    <TableRow key={workflow.code} className="hover:bg-gray-50">
                                        <TableCell>{workflow.code}</TableCell>
                                        <TableCell>{workflow.designation}</TableCell>
                                        <TableCell>{workflow.description}</TableCell>
                                        <TableCell>{workflow.order_type}</TableCell>
                                        <TableCell>
                                            <div className="flex items-end justify-end gap-2">
                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/workflow/${workflow.code}`)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <FileEdit size={18} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => navigate.push(`/admin/workflow/${workflow.code}`)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <PowerCircle size={18} />
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
                                            <span className="ml-2 mt-2">NENHUM WORKFLOW ENCONTRADO</span>
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

export default WorkFlowTable