"use client"

import type React from "react"
import { useState, type ReactNode } from "react"
import { Paper, TableContainer } from "@mui/material"
import { AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/ui/table"
import FiltersPag from "@/components/shared/filters/filter"

export type Column = {
    name: string
    uid: string
    render?: (item: any, index: number) => ReactNode
}

type DataTableProps<T> = {
    data: T[]
    columns: Column[]
    isLoading?: boolean
    emptyMessage?: string
    searchKeys?: (keyof T)[]
    actions?: (item: T, index: number) => ReactNode
    initialRowsPerPage?: number
}

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    isLoading = false,
    emptyMessage = "NENHUM DADO ENCONTRADO...",
    searchKeys = [],
    actions,
    initialRowsPerPage = 10,
}: DataTableProps<T>) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase())
        setPage(0)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const filteredData = data?.filter((item) => {
        if (!searchTerm) return true

        return searchKeys.some((key) => {
            const value = item[key]
            if (value === null || value === undefined) return false
            return String(value).toLowerCase().includes(searchTerm)
        })
    })

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    const columnsToRender = actions ? [...columns, { name: "Actions", uid: "actions" }] : columns

    return (
        <div className="flex flex-col w-full">
            <div>
                <FiltersPag
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSearchChange={handleSearchChange}
                    totalCount={filteredData.length}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columnsToRender.map((column) => (
                                <TableHead className={`${column.uid === "actions" ? "text-right" : ""}`} key={column.uid}>
                                    {column.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow className="hover:bg-gray-50">
                                <TableCell colSpan={columnsToRender.length}>
                                    <div className="flex items-center justify-center h-64">
                                        <div className="w-16 h-16 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <TableCell key={`${index}-${column.uid}`}>
                                            {column.render
                                                ? column.render(item, index)
                                                : item[column.uid] !== undefined
                                                    ? String(item[column.uid])
                                                    : ""}
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell>
                                            <div className="flex items-end justify-end gap-2">{actions(item, index)}</div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-gray-50">
                                <TableCell colSpan={columnsToRender.length}>
                                    <div className="flex flex-col items-center justify-center h-full py-8">
                                        <AlertCircle className="w-8 h-8 text-red-400" />
                                        <span className="mt-2 ml-2">{emptyMessage}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}