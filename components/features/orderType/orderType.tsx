import React, { useEffect, useState } from 'react'
import OrderTypeTable from './orderTypeTable';
import { List, Plus } from 'lucide-react';
import { MuiAutocompleteSelect } from '@/components/shared/ui/autocomplete-select';
import { View } from '@/utils/enums';
import OrderTypeForm from './orderTypeForm';
import { useGet, usePost, usePut } from '@/data/hooks';
import { API_ENDPOINTS } from '@/data/client/endpoint';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { OrderType } from '@/model/orderType';

const OrderTypeComp = () => {
    const queryClient = useQueryClient();
    const [view, setView] = useState<View>(View?.LIST);
    const [orderType, setOrderType] = useState('');
    const [selectedOrderTypeRow, setSelectedOrderTypeRow] = useState<OrderType | null>(null);

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
        endpoint: API_ENDPOINTS.ADD_ORDER_TYPE,
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
        orderTypes: Yup.string().required('O tipo de pedido é obrigatório'),
        description: Yup.string().notRequired(),
    });

    const workflowEditSchema = workflowSchema.shape({
        code: Yup.string().required('O código é obrigatório'),
    });

    const formik = useFormik({
        initialValues: {
            designation: '',
            orderTypes: '',
            code: '',
        },
        validationSchema: view === 'edit' ? workflowEditSchema : workflowSchema,
        onSubmit: (values) => {
            const { code, ...data } = values;

            if (view === 'edit' && selectedOrderTypeRow) {
                put({ values });
            } else {
                post(view === "edit" ? values : data);
            }
        },
    });

    useEffect(() => {
        if (view === 'edit' && selectedOrderTypeRow) {
            formik.setValues({
                code: selectedOrderTypeRow.code || '',
                designation: selectedOrderTypeRow.designation || '',
                orderTypes: selectedOrderTypeRow.orderTypes || '',
            });
        } else {
            formik.resetForm();
        }
    }, [selectedOrderTypeRow, view]);

    const { data: orderTypesEnum } = useGet({
        endpoint: API_ENDPOINTS.GET_ENUM_ORDER_TYPE,
    });

    const handleOrderTypeChange = (value: string) => {
        setOrderType(value)
        formik.setFieldValue('orderTypes', value)
    }

    return (
        <>
            {view === 'list' && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<Plus />}
                        options={orderTypesEnum || []}
                        value={orderType}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="orderTypes"
                        label="Tipo de Pedido"
                        onButtonClick={() => setView(View.ADD)}
                        valueField="value"
                        labelField="name"
                    />

                    <OrderTypeTable setView={setView} setSelectedOrderTypeRow={setSelectedOrderTypeRow} />
                </>
            )}

            {(view === View?.ADD || view === View?.EDIT) && (
                <>
                    <MuiAutocompleteSelect
                        Icon={<List />}
                        options={orderTypesEnum || []}
                        value={formik?.values?.orderTypes}
                        onChange={handleOrderTypeChange}
                        onChangeFormik={formik.setFieldValue}
                        fieldName="orderTypes"
                        label="Tipo de Pedido"
                        buttonLabel='LISTAR'
                        onButtonClick={() => setView(View.LIST)}
                        valueField="value"
                        labelField="name"
                    />

                    <OrderTypeForm formik={formik} isPending={isPending || isUpdating} isEditMode={view === View?.EDIT} />
                </>
            )}
        </>
    );
};

export default OrderTypeComp