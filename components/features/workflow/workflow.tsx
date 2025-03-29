import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet, usePost, usePut } from '@/data/hooks'
import React, { useEffect, useState } from 'react'
import WorkFlowTable from './workFlowTable'
import { List, Plus } from 'lucide-react'
import AddWorkFlow from './addWorkFlow'
import { toast } from '@/hooks/use-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import { Workflow } from '@/model/workflow'
import { View } from '@/utils/enums'
import { MuiAutocompleteSelect } from '@/components/shared/ui/autocomplete-select'

const WorkflowComp = () => {
    const queryClient = useQueryClient();
    const [view, setView] = useState<View>(View?.LIST);
    const [orderType, setOrderType] = useState('');
    const [selectedWorkflowRow, setSelectedWorkflowRow] = useState<Workflow | null>(null);

    const handleSuccess = (data: any) => {
        toast({
            title: 'Sucesso',
            description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.GET_WORKFLOW] });
        formik.resetForm();
        setView(View?.LIST);
    };

    const handleError = (error: any) => {
        toast({
            title: 'Erro',
            description: error.response?.data?.message || 'Ocorreu um erro',
            variant: 'destructive',
        });
    };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.ADD_WORKFLOW,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const { put, isPending: isUpdating } = usePut({
        endpoint: API_ENDPOINTS.UPDATE_WORKFLOW,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const workflowSchema = Yup.object().shape({
        designation: Yup.string().required('A designação é obrigatória'),
        order_type_code: Yup.string().required('O tipo de pedido é obrigatório'),
        description: Yup.string().notRequired(),
    });

    const workflowEditSchema = workflowSchema.shape({
        code: Yup.string().required('O código é obrigatório'),
        designation: Yup.string().required('A designação é obrigatória'),
        order_type_code: Yup.string().required('O tipo de pedido é obrigatório'),
        description: Yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            designation: '',
            order_type_code: '',
            description: '',
            code: '',
        },
        validationSchema: view === 'edit' ? workflowEditSchema : workflowSchema,
        onSubmit: (values) => {
            const { code, ...data } = values;

            if (view === 'edit' && selectedWorkflowRow) {
                put({ values });
            } else {
                post(view === "edit" ? values : data);
            }
        },
    });

    useEffect(() => {
        if (view === 'edit' && selectedWorkflowRow) {
            formik.setValues({
                code: selectedWorkflowRow.code || '',
                designation: selectedWorkflowRow.designation || '',
                description: selectedWorkflowRow.description || '',
                order_type_code: selectedWorkflowRow.orderTypeCode || '',
            });
        } else {
            formik.resetForm();
        }
    }, [selectedWorkflowRow, view]);

    const { data: orderTypes } = useGet({
        endpoint: API_ENDPOINTS.GET_ORDER_TYPE,
    });

    const handleOrderTypeChange = (value: string) => {
        setOrderType(value)
        formik.setFieldValue('order_type_code', value)
    }

    return (
        <>
            {view === 'list' && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<Plus />}
                        options={orderTypes?.data || []}
                        value={orderType}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="order_type_code"
                        label="Tipo de Pedido"
                        onButtonClick={() => setView(View.ADD)}
                    />

                    <WorkFlowTable setView={setView} setSelectedWorkflowRow={setSelectedWorkflowRow} />
                </>
            )}

            {(view === View?.ADD || view === View?.EDIT) && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<List />}
                        options={orderTypes?.data || []}
                        value={formik?.values?.order_type_code}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="order_type_code"
                        label="Tipo de Pedido"
                        buttonLabel='LISTAR'
                        onButtonClick={() => setView(View.LIST)}
                    />

                    <AddWorkFlow formik={formik} isPending={isPending || isUpdating} isEditMode={view === View?.EDIT} />
                </>
            )}
        </>
    );
};

export default WorkflowComp;