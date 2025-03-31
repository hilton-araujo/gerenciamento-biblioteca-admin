"use client"
import { TabLayout } from '@/components/common/tabl-layout';
import OrderTypeComp from '@/components/features/orderType/orderType';
import { List } from 'lucide-react';
import React from 'react'

const OrderTypePage = () => {
    const tabs = [
        { label: "Tipo de Pedido", value: "1", component: <OrderTypeComp /> },
    ]

    return <TabLayout title={"Gerenciar Tipos de Pedido"} tabs={tabs || []} description={"Aqui vocês pode gerenciar os tipos de pedido."} icon={List} />;
}

export default OrderTypePage