import React from 'react'
import Header from '../header'
import { useRouter } from 'next/navigation'
import CategoryTable from './categoryTable'

type Props = {
    categories: any
    isLoading: boolean
}

const ListCategories = ({ categories, isLoading }: Props) => {
    const navigate = useRouter()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Gestão de Categorias'}
                        description={'Encontre aqui os detalhes de todas as categorias.'}
                        addButton={true}
                        buttons={true}
                        onClick={() => navigate.push("category/add")}
                    />

                    <CategoryTable categories={categories} isLoading={isLoading} />
                </main>
            </div>
        </div>
    )
}

export default ListCategories