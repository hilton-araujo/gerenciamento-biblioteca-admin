"use client";
import ListCategories from '@/components/features/category/listCategories';
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet } from '@/data/hooks'
import React from 'react'

const CategoryPage = () => {

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_CATEGORIES
    })
    const categories = data?.data ?? []

    return <ListCategories categories={categories} isLoading={isLoading} />;
}

export default CategoryPage