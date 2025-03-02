"use client";
import EmployeeForm from '@/components/employeeComp/employeeForm';
import { PageHeader } from '@/components/app-header';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import React from 'react'

const AddEmployeePage = () => {


    return (
        <>
            <PageHeader
                title="Adicionar Funcionário"
                description="Adicionar um novo funcionário ao sistema de biblioteca"
                icon={Users}
                backUrl="../employee"
            />

            <Card className="animate-fade-in">
                <CardHeader>
                    <CardTitle>Informações de Funcionário</CardTitle>
                    <CardDescription>
                        Insira os detalhes do novo funcionário.
                    </CardDescription>
                </CardHeader>

                <EmployeeForm />
            </Card>
        </>
    )
}

export default AddEmployeePage