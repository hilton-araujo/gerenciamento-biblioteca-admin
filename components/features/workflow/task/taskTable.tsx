"use client"
import { IconButton } from "@mui/material"
import { FileEdit, PowerCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Workflow } from "@/model/workflow"
import { DataTable, type Column } from "@/components/shared/data-table"
import { useGet } from "@/data/hooks"
import { API_ENDPOINTS } from "@/data/client/endpoint"
import { View } from "@/utils/enums"
import { Task } from "@/model/task"

type WorkflowTableProps = {
    setView: (view: View) => void
    setSelectedTaskRow: (task: Task) => void
}

const TaskTable = ({ setView, setSelectedTaskRow }: WorkflowTableProps) => {
    const router = useRouter()

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_TASK
    })
    const task = data?.data ?? []

    const columns: Column[] = [
        { name: "Código", uid: "code" },
        { name: "Designaçao", uid: "designation" },
        { name: "Descrição", uid: "description" },
        { name: "Tipo de Pedido", uid: "order_type" },
    ]

    const handleActions = (task: Task) => (
        <>
            <IconButton
                onClick={() => {
                    setView(View.EDIT)
                    setSelectedTaskRow(task)
                }}
                className="text-blue-500 hover:text-blue-700"
            >
                <FileEdit size={18} />
            </IconButton>
            <IconButton
                onClick={() => router.push(`/admin/workflow/${task.code}`)}
                className="text-red-500 hover:text-red-700"
            >
                <PowerCircle size={18} />
            </IconButton>
        </>
    )

    return (
        <DataTable
            data={task?.flatMap((item: Task) => (item?.employee ?? [])) ?? []}
            columns={columns}
            isLoading={isLoading}
            searchKeys={["code", "designation"]}
            emptyMessage="NENHUMA TAREFA ENCONTRADA"
            actions={handleActions}
        />
    )
}

export default TaskTable