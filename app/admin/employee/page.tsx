"use client";
import ListEmployee from '@/components/employeeComp/listEmployee'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet } from '@/data/hooks'
import React from 'react'

const EmployeesPage = () => {

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_EMPLOYEES
    })

    return <ListEmployee employees={data?.data ?? []} isLoading={isLoading} />;
}

export default EmployeesPage