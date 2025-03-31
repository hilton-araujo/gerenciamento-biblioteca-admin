import { Column, DataTable } from '@/components/shared/data-table'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet } from '@/data/hooks'
import { OrderType } from '@/model/orderType'
import { View } from '@/utils/enums'
import { IconButton } from '@mui/material'
import { FileEdit, PowerCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type OrderTypeTableProps = {
    setView: (view: View) => void
    setSelectedOrderTypeRow: (orderType: OrderType) => void
}
const OrderTypeTable = ({ setView, setSelectedOrderTypeRow }: OrderTypeTableProps) => {
    const router = useRouter()

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_ORDER_TYPE
    })
    const orderType = data?.data ?? []

    const columns: Column[] = [
        { name: "Código", uid: "code" },
        { name: "Designaçao", uid: "designation" },
        { name: "Tipo de Pedido", uid: "orderTypes" },
    ]

    const handleActions = (orderType: OrderType) => (
        <>
            <IconButton
                onClick={() => {
                    setView(View.EDIT)
                    setSelectedOrderTypeRow(orderType)
                }}
                className="text-blue-500 hover:text-blue-700"
            >
                <FileEdit size={18} />
            </IconButton>
            <IconButton
                onClick={() => router.push(`/admin/workflow/${orderType.code}`)}
                className="text-red-500 hover:text-red-700"
            >
                <PowerCircle size={18} />
            </IconButton>
        </>
    )

    return (
        <DataTable
            data={orderType}
            columns={columns}
            isLoading={isLoading}
            searchKeys={["code", "designation"]}
            emptyMessage="NENHUM TIPO DE PEDIDO ENCONTRADO"
            actions={handleActions}
        />
    )
}

export default OrderTypeTable