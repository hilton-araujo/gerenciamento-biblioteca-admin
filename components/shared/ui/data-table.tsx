import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material"; // Importando a paginação do MUI
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    title: string;
    addUrl?: string;
    isLoading?: boolean;
    actions?: (item: T) => React.ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    title,
    addUrl,
    isLoading = false,
    actions
}: DataTableProps<T>) {
    const navigate = useRouter();
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="w-full space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium">{title}</h2>
                {addUrl && (
                    <Button
                        onClick={() => navigate.push(addUrl)}
                        className="flex items-center gap-1 transition-all hover:gap-2"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Cadastrar</span>
                    </Button>
                )}
            </div>
            <div className="border rounded-md bg-card">
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-pulse-soft">Loading...</div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        NENHUM REGISTRO ENCONTRADO
                    </div>
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableHead key={index}>{column.header}</TableHead>
                                    ))}
                                    {actions && <TableHead className="text-right">Ações</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex} className="transition-colors hover:bg-muted/30">
                                        {columns.map((column, colIndex) => (
                                            <TableCell key={`${rowIndex}-${colIndex}`}>
                                                {column.cell ? column.cell(row) : (row[column.accessorKey] as React.ReactNode)}
                                            </TableCell>
                                        ))}
                                        {actions && (
                                            <TableCell className="text-right">
                                                {actions(row)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-end p-4">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
