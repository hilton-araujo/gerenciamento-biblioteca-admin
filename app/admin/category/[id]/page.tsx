"use client";
import EditCategoryForm from '@/components/categoryComp/editCategoryForm';
import { PageHeader } from '@/components/app-header';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { useGet } from '@/data/hooks';
import { FolderOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EditCategoryPage = () => {
    const { id } = useParams();

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CATEGORY_BY_ID(id as string)
    })
    const category = data?.data ?? []

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex flex-col w-full">
                <main className="grid items-start flex-1 grid-cols-1 gap-4">
                    <PageHeader
                        title="Edição de Categoria"
                        description="Editar uma categoria à coleção da biblioteca"
                        icon={FolderOpen}
                        backUrl="../category"
                    />

                    <Card className="animate-fade-in">
                        <CardHeader>
                            <CardTitle>Informações de Edição da categoria</CardTitle>
                            <CardDescription>
                                Insira os detalhes a editar na categoria de livro.
                            </CardDescription>
                        </CardHeader>

                        <EditCategoryForm category={category} categoryId={id as string} />
                    </Card>
                </main>
            </div>
        </div>
    )
}

export default EditCategoryPage