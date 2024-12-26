"use client";
import EditClientForm from '@/components/clientComp/editClientForm';
import Header from '@/components/header';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { useGet } from '@/data/hooks';
import { Client } from '@/model/client';
import { useParams } from 'next/navigation';
import React from 'react'

const EditClientPage = () => {

    const { nuit } = useParams()

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CLIENT_BY_NUIT(nuit as string)
    })

    const client = data?.data ?? {} as Client

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Editar Cliente'}
                        description={'Aqui você pode editar os detalhes de um cliente.'}
                        addButton={false}
                        buttons={false}
                    />

                    <EditClientForm clientNuit={nuit as string} client={client} />
                </main>
            </div>
        </div>
    )
}

export default EditClientPage