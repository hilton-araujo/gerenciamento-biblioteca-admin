"use client";
import EditClientForm from '@/components/clientComp/editClientForm';
import { PageHeader } from '@/components/app-header';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { useGet } from '@/data/hooks';
import { Client } from '@/model/client';
import { Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'

const EditClientPage = () => {

    const { nuit } = useParams()

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CLIENT_BY_NUIT(nuit as string)
    })

    const client = data?.data ?? {} as Client

    return (
        <>
            <PageHeader
                title="Editar Cliente"
                description="Editar cliente do sistema de biblioteca"
                icon={Users}
                backUrl="../client"
            />

            <Card className="animate-fade-in">
                <CardHeader>
                    <CardTitle>Informações a Editar de Cliente</CardTitle>
                    <CardDescription>
                        Insira os detalhes a Editar no cliente.
                    </CardDescription>
                </CardHeader>

                <EditClientForm clientNuit={nuit as string} client={client} />
            </Card>
        </>
    )
}

export default EditClientPage