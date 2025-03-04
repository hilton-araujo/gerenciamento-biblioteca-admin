import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet, usePost } from '@/data/hooks'
import React, { useEffect } from 'react'
import WorkFlowTable from './workFlowTable'
import { MenuItem, TextField } from '@mui/material'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import AddWorkFlow from './addWorkFlow'
import { toast } from '@/hooks/use-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'

const WorkflowComp = () => {
    const queryClient = useQueryClient();
    const [view, setView] = React.useState("list")
    const [orderType, setOrderType] = React.useState("")

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_WORKFLOW] })
        addWorkflowFormik?.setSubmitting(false);
        addWorkflowFormik?.resetForm();
        setView("list")
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        addWorkflowFormik?.setSubmitting(false);
    };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.ADD_WORKFLOW,
        successAction: handleSuccess,
        errorAction: handleError
    });

    const workflowSchema = Yup.object().shape({
        designation: Yup.string().required("A designação é obrigatório"),
        order_type_code: Yup.string().required("O tipo de pedido é obrigatório"),
    })

    const addWorkflowFormik = useFormik({
        initialValues: {
            designation: "",
            order_type_code: "",
        },
        onSubmit: (values) => {
            post(values)
        },
    })

    const { data, isLoading } = useGet({
        endpoint: API_ENDPOINTS.GET_WORKFLOW
    })

    const workflow = data?.data ?? []

    const { data: ortferTypes } = useGet({
        endpoint: API_ENDPOINTS.GET_ORDER_TYPE
    })

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_WORKFLOW] })
    }, [post])

    return (
        <>
            {view === "list" && (
                <>
                    <div className="flex flex-row items-center gap-4 p-2 bg-gray-100 rounded-md">
                        <div className="flex flex-col flex-1">
                            <div className='flex items-center mb-2'>
                                <TextField
                                    id="order_type_code"
                                    size="small"
                                    select
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => {
                                        setOrderType(event.target.value)
                                        addWorkflowFormik?.setFieldValue("order_type_code", event.target.value)
                                    }}
                                    value={orderType}
                                    name="order_type_code"
                                    label="Tipo de Pedido"
                                >
                                    {ortferTypes?.data?.map((option: any) => (
                                        <MenuItem key={option.id} value={option.code}>
                                            {option.designation}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button className="text-white bg-blue-500" onClick={() => { setView("add") }}>
                                <PlusIcon />
                                Criar Novo
                            </Button>
                        </div>
                    </div>

                    <WorkFlowTable workflows={workflow} isLoading={isLoading} />
                </>
            )}

            {view === "add" && (
                <>
                    <div className="flex flex-row items-center gap-4 p-2 bg-gray-100 rounded-md">
                        <div className="flex flex-col flex-1">
                            <div className='flex items-center mb-2'>
                                <TextField
                                    id="order_type_code"
                                    size="small"
                                    select
                                    fullWidth
                                    variant="standard"
                                    onChange={addWorkflowFormik?.handleChange}
                                    onBlur={addWorkflowFormik?.handleBlur}
                                    value={addWorkflowFormik?.values?.order_type_code}
                                    name="order_type_code"
                                    label="Tipo de Pedido"
                                >
                                    {ortferTypes?.data?.map((option: any) => (
                                        <MenuItem key={option.id} value={option.code}>
                                            {option.designation}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button className="text-white bg-blue-500" onClick={() => { setView("list") }}>
                                <PlusIcon />
                                LISTAR
                            </Button>
                        </div>
                    </div>

                    <AddWorkFlow formik={addWorkflowFormik} isPending={isPending} />
                </>
            )}
        </>
    )
}

export default WorkflowComp