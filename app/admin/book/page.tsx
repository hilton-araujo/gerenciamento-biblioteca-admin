"use client";
import React from 'react'
import { useGet } from '@/data/hooks';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import ListBook from '@/components/features/book/listBook';

const BookPage = () => {

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_BOOKS
    })
    const books = data?.data ?? []

    return <ListBook props={books} isLoading={isLoading} />
}

export default BookPage