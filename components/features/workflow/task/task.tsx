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
import TaskForm from './taskForm'
import TaskTable from './taskTable'
import { Task } from '@/model/task'

const TaskComp = () => {
    const queryClient = useQueryClient();
    const [view, setView] = useState<View>(View?.LIST);
    const [orderType, setOrderType] = useState('');
    const [selectedTaskRow, setSelectedTaskRow] = useState<Task | null>(null);

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
        endpoint: API_ENDPOINTS.ADD_TASK_COLABORATOR,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const { put, isPending: isUpdating } = usePut({
        endpoint: API_ENDPOINTS.UPDATE_TASK_COLABORATOR,
        successAction: handleSuccess,
        errorAction: handleError,
    });

    const taskSchema = Yup.object().shape({
        designation: Yup.string().required('A designação é obrigatória'),
        stageCode: Yup.string().required('O tipo de pedido é obrigatório'),
        employeeCode: Yup.array().required("O colaborador é obrigatório"),
    });

    const taskEditSchema = taskSchema.shape({
        code: Yup.string().required('O código é obrigatório'),
    });

    const formik = useFormik({
        initialValues: {
            designation: '',
            stageCode: '',
            employeeCode: [],
            code: '',
        },
        validationSchema: view === 'edit' ? taskEditSchema : taskSchema,
        onSubmit: (values) => {
            const { code, ...data } = values;

            if (view === 'edit' && selectedTaskRow) {
                put({ values });
            } else {
                post(view === "edit" ? values : data);
            }
        },
    });

    useEffect(() => {
        if (view === 'edit' && selectedTaskRow) {
            formik.setValues({
                code: selectedTaskRow.code || '',
                designation: selectedTaskRow.designation || '',
                stageCode: selectedTaskRow.stageCode || '',
                employeeCode: selectedTaskRow.employee || [],
            });
        } else {
            formik.resetForm();
        }
    }, [selectedTaskRow, view]);

    const { data: stage } = useGet({
        endpoint: API_ENDPOINTS.GET_STAGE,
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
                        options={stage?.data || []}
                        value={orderType}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="stageCode"
                        label="Etapa"
                        onButtonClick={() => setView(View.ADD)}
                    />

                    <TaskTable setView={setView} setSelectedTaskRow={setSelectedTaskRow} />
                </>
            )}

            {(view === View?.ADD || view === View?.EDIT) && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<List />}
                        options={stage?.data || []}
                        value={formik?.values?.stageCode}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="stageCode"
                        label="Etapa"
                        buttonLabel='LISTAR'
                        onButtonClick={() => setView(View.LIST)}
                    />

                    <TaskForm formik={formik} isPending={isPending || isUpdating} isEditMode={view === View?.EDIT} />
                </>
            )}
        </>
    );
};

export default TaskComp;