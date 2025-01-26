import React from 'react'
import Header from '../header';
import { useRouter } from 'next/navigation';
import EmployeeTable from './employeeTable';

interface Props {
    employees: any;
    isLoading: boolean;
}

const ListEmployee = ({ employees, isLoading }: Props) => {
    const navigate = useRouter()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Gestão de Funcionários'}
                        description={'Encontre aqui os detalhes de todos os funcionários.'}
                        addButton={true}
                        buttons={true}
                        onClick={() => navigate.push("employee/add")}
                    />

                    <EmployeeTable employees={employees} isLoading={isLoading} />
                </main>
            </div>
        </div>
    )
}

export default ListEmployee