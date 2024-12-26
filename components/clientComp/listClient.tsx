import React from 'react'
import Header from '../header'
import { useRouter } from 'next/navigation'
import ClientTable from './clientTable.'

type Props = {
    clients: any
    isLoading: boolean
}


const ListClient = ({ clients, isLoading }: Props) => {
    const navigate = useRouter()
    console.log("clients", clients);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Gestão de Clientes'}
                        description={'       Encontre aqui os detalhes de todos os clientes.'}
                        addButton={true}
                        buttons={true}
                        onClick={() => navigate.push("client/add")}
                    />

                    <ClientTable clients={clients} isLoading={isLoading} />
                </main>
            </div>
        </div>
    )
}

export default ListClient