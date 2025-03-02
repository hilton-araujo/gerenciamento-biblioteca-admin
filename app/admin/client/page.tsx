"use client";
import ListClient from '@/components/clientComp/listClient'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet } from '@/data/hooks'
import React from 'react'

const ClientPage = () => {

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_CLIENTS
    })
    const clients = data?.data ?? []

    return <ListClient clients={clients} isLoading={isLoading} />;
}

export default ClientPage