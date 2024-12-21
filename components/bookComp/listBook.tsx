import React from 'react'
import BookTable from './bookTable'
import Header from '../header'
import { useRouter } from 'next/navigation'

type Props = {
    props: any
    isLoading: boolean
}


const ListBook = ({ props, isLoading }: Props) => {
    const navigate = useRouter()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Gestão de Livros'}
                        description={'       Encontre aqui os detalhes de todos os livros.'}
                        addButton={true}
                        buttons={true}
                        onClick={() => navigate.push("book/add")}
                    />

                    <BookTable books={props} isLoading={isLoading} />
                </main>
            </div>
        </div>
    )
}

export default ListBook