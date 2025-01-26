"use client";
import ListEmployee from '@/components/employeeComp/listEmployee'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet } from '@/data/hooks'
import React from 'react'

const page = () => {

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_EMPLOYEES
    })

    return (
        <div>
            <ListEmployee employees={data?.data ?? []} isLoading={isLoading} />
        </div>
    )
}

export default page