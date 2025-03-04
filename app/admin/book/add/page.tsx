"use client";
import { PageHeader } from '@/components/app-header';
import AddBookForm from '@/components/features/book/addBookForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Book } from 'lucide-react';
import React from 'react'

const AddBookPage = () => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader
                        title="Cadastro de Livros"
                        description="Adicionar um novo livro à coleção da biblioteca"
                        icon={Book}
                        backUrl="../book"
                    />

                    <Card className="animate-fade-in">
                        <CardHeader>
                            <CardTitle>Informações do livro</CardTitle>
                            <CardDescription>
                                Insira os detalhes do novo livro para adicionar à coleção.
                            </CardDescription>
                        </CardHeader>

                        <AddBookForm />
                    </Card>
                </main>
            </div>
        </div>
    )
}

export default AddBookPage