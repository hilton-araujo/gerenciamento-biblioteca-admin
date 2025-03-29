import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useGet, usePost, usePut } from '@/data/hooks'
import React, { useEffect, useState } from 'react'
import { List, Plus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import { View } from '@/utils/enums'
import { MuiAutocompleteSelect } from '@/components/shared/ui/autocomplete-select'
import StageTable from './stageTable'
import StageForm from './stageForm'
import { Stage } from '@/model/stage'

const StageComp = () => {
    const queryClient = useQueryClient();
    const [view, setView] = useState<View>(View?.LIST);
    const [orderType, setOrderType] = useState('');
    const [selectedStageRow, setSelectedStageRow] = useState<Stage | null>(null);

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
        endpoint: API_ENDPOINTS.ADD_STAGE,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const { put, isPending: isUpdating } = usePut({
        endpoint: API_ENDPOINTS.UPDATE_STAGE,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const workflowSchema = Yup.object().shape({
        designation: Yup.string().required('A designação é obrigatória'),
        stageOrder: Yup.string().required('A ordem é obrigatório'),
        workflowCode: Yup.string().required('O workflow é obrigatório'),
    });

    const workflowEditSchema = workflowSchema.shape({
        code: Yup.string().required('O código é obrigatório'),
        designation: Yup.string().required('A designação é obrigatória'),
        workflowCode: Yup.string().required('O tipo de pedido é obrigatório'),
        stageOrder: Yup.string().required('A ordem é obrigatório'),
    });

    const formik = useFormik({
        initialValues: {
            designation: '',
            workflowCode: '',
            stageOrder: '',
            code: '',
        },
        validationSchema: view === 'edit' ? workflowEditSchema : workflowSchema,
        onSubmit: (values) => {
            const { code, ...data } = values;

            if (view === 'edit' && selectedStageRow) {
                put({ values });
            } else {
                post(view === "edit" ? values : data);
            }
        },
    });

    useEffect(() => {
        if (view === 'edit' && selectedStageRow) {
            formik.setValues({
                code: selectedStageRow.code || '',
                designation: selectedStageRow.designation || '',
                stageOrder: selectedStageRow.stageOrder || '',
                workflowCode: selectedStageRow.workflowCode || '',
            });
        } else {
            formik.resetForm();
        }
    }, [selectedStageRow, view]);

    const { data: workflow } = useGet({
        endpoint: API_ENDPOINTS.GET_WORKFLOW,
    });

    const handleOrderTypeChange = (value: string) => {
        setOrderType(value)
        formik.setFieldValue('workflowCode', value)
    }

    return (
        <>
            {view === 'list' && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<Plus />}
                        options={workflow?.data || []}
                        value={orderType}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="workflowCode"
                        label="Workflow"
                        onButtonClick={() => setView(View.ADD)}
                    />

                    <StageTable setView={setView} setSelectedStageRow={setSelectedStageRow} />
                </>
            )}

            {(view === View?.ADD || view === View?.EDIT) && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<List />}
                        options={workflow?.data || []}
                        value={formik?.values?.workflowCode}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="workflowCode"
                        label="WorkFlow"
                        buttonLabel='LISTAR'
                        onButtonClick={() => setView(View.LIST)}
                    />

                    <StageForm formik={formik} isPending={isPending || isUpdating} isEditMode={view === View?.EDIT} />
                </>
            )}
        </>
    );
};

export default StageComp;