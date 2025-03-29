"use client"
import { IconButton } from "@mui/material"
import { FileEdit, PowerCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Workflow } from "@/model/workflow"
import { DataTable, type Column } from "@/components/shared/data-table"
import { useGet } from "@/data/hooks"
import { API_ENDPOINTS } from "@/data/client/endpoint"
import { View } from "@/utils/enums"
import { Stage } from "@/model/stage"

type StageTableProps = {
    setView: (view: View) => void
    setSelectedStageRow: (satege: Stage) => void
}

const StageTable = ({ setView, setSelectedStageRow }: StageTableProps) => {
    const router = useRouter()

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_STAGE
    })
    const stage = data?.data ?? []

    const columns: Column[] = [
        { name: "Código", uid: "code" },
        { name: "Ordem", uid: "stageOrder" },
        { name: "Designaçao", uid: "designation" },
        { name: "Workflow", uid: "workflow" },
    ]

    const handleActions = (satege: Stage) => (
        <>
            <IconButton
                onClick={() => {
                    setView(View.EDIT)
                    setSelectedStageRow(satege)
                }}
                className="text-blue-500 hover:text-blue-700"
            >
                <FileEdit size={18} />
            </IconButton>
            <IconButton
                onClick={() => router.push(`/admin/workflow/${satege.code}`)}
                className="text-red-500 hover:text-red-700"
            >
                <PowerCircle size={18} />
            </IconButton>
        </>
    )

    return (
        <DataTable
            data={stage}
            columns={columns}
            isLoading={isLoading}
            searchKeys={["code", "designation"]}
            emptyMessage="NENHUMA ETAPA ENCONTRADO"
            actions={handleActions}
        />
    )
}

export default StageTable