"use client";
import EditBookForm from '@/components/bookComp/editBook'
import Header from '@/components/header';
import { useParams } from 'next/navigation';
import React from 'react'

const EditBookPage = () => {
    const { id } = useParams()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Editar Livro'}
                        description={'Aqui você pode editar os detalhes de um livro.'}
                        addButton={false}
                        buttons={false}
                    />
                    <EditBookForm bookId={id as string} />
                </main>
            </div>
        </div>
    )
}

export default EditBookPage