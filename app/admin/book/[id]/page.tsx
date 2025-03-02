"use client";
import EditBookForm from '@/components/bookComp/editBook'
import { PageHeader } from '@/components/app-header';
import { Book } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'

const EditBookPage = () => {
    const { id } = useParams()

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader
                        title="Edição de Livro"
                        description="Editar um livro à coleção da biblioteca"
                        icon={Book}
                        backUrl="../book"
                    />
                    <EditBookForm bookId={id as string} />
                </main>
            </div>
        </div>
    )
}

export default EditBookPage