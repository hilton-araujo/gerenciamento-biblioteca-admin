"use client";
import { PageHeader } from '@/components/app-header';
import AddClientForm from '@/components/features/client/addClientForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card';
import { Users } from 'lucide-react';
import React from 'react'

const AddClientPage = () => {
    return (
        <>
            <PageHeader
                title="Adicionar Cliente"
                description="Adicionar um novo cliente ao sistema de biblioteca"
                icon={Users}
                backUrl="../client"
            />

            <Card className="animate-fade-in">
                <CardHeader>
                    <CardTitle>Informações de Cliente</CardTitle>
                    <CardDescription>
                        Insira os detalhes do novo cliente.
                    </CardDescription>
                </CardHeader>

                <AddClientForm />
            </Card>
        </>
    )
}

export default AddClientPage