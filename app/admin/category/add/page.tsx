"use client";
import { PageHeader } from '@/components/app-header';
import AddCategorieForm from '@/components/features/category/addCategorieForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { FolderOpen } from 'lucide-react';
import React from 'react'

const AddCategoryPage = () => {
    return (
        <>
            <PageHeader
                title="Adicionar categoria"
                description="Adicionar uma nova categoria de livro ao sistema de biblioteca"
                icon={FolderOpen}
                backUrl="../category"
            />

            <Card className="animate-fade-in">
                <CardHeader>
                    <CardTitle>Informações da categoria</CardTitle>
                    <CardDescription>
                        Insira os detalhes da nova categoria de livro.
                    </CardDescription>
                </CardHeader>

                <AddCategorieForm />
            </Card>
        </>
    )
}

export default AddCategoryPage