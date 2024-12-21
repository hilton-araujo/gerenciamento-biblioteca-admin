"use client";
import EditCategoryForm from '@/components/categoryComp/editCategoryForm';
import Header from '@/components/header';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { useGet } from '@/data/hooks';
import { useParams } from 'next/navigation';
import React from 'react'

const EditCategoryPage = () => {
    const { id } = useParams();

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CATEGORY_BY_ID(id as string)
    })
    const category = data?.data ?? []

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Editar Categoria'}
                        description={'Aqui você pode editar os detalhes de um categoria.'}
                        addButton={false}
                        buttons={false}
                    />
                    <EditCategoryForm category={category} categoryId={id as string} />
                </main>
            </div>
        </div>
    )
}

export default EditCategoryPage