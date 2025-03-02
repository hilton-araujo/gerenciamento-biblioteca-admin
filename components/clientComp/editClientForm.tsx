import { CardContent, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { usePut } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';
import { generateFieldProps } from '../generateFieldProps';
import { Client } from '@/model/client';

interface ClientProps {
    clientNuit: string
    client: Client
}

const EditClientForm = ({ clientNuit, client }: ClientProps) => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        editClientFormik?.setSubmitting(false);
        editClientFormik?.resetForm();
        navigate.push("/admin/client");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        editClientFormik?.setSubmitting(false);
    };

    const { put, isPending } = usePut({
        endpoint: API_ENDPOINTS.ADD_CLIENT,
        successAction: handleSuccess,
        errorAction: handleError
    });

    const addClientSchema = Yup.object().shape({
        name: Yup.string().required('O nome do cliente é obrigatório'),
        surname: Yup.string().required('O apelido do cliente é obrigatório'),
        nuit: Yup.string().required('O NUIT do cliente é obrigatório'),
        email: Yup.string().email('Email inválido').required('O email do cliente é obrigatório'),
        phone: Yup.string().required('O celular do cliente é obrigatório'),
        address: Yup.string().required('O endereço do cliente é obrigatório'),
        city: Yup.string().required('A cidade do cliente é obrigatória'),
        postalCode: Yup.string().required('O código postal do cliente é obrigatório'),
        documentNumber: Yup.string().required('O número de documento do cliente é obrigatório')
    });

    const editClientFormik = useFormik({
        initialValues: {
            code: client?.code ?? '',
            name: client?.name ?? '',
            surname: client?.surname ?? '',
            nuit: clientNuit ?? '',
            email: client?.email ?? '',
            phone: client?.phone ?? '',
            address: client?.address ?? '',
            city: client?.city ?? '',
            postalCode: client?.postalCode ?? '',
            documentNumber: client?.documentNumber ?? '',
        },
        validationSchema: addClientSchema,
        onSubmit: (values) => {
            put(values);
        },
    });

    useEffect(() => {
        editClientFormik?.setFieldValue('code', clientNuit ?? '');
        editClientFormik?.setFieldValue('name', client?.name ?? '');
        editClientFormik?.setFieldValue('surname', client?.surname ?? '');
        editClientFormik?.setFieldValue('nuit', clientNuit ?? '');
        editClientFormik?.setFieldValue('email', client?.email ?? '');
        editClientFormik?.setFieldValue('phone', client?.phone ?? '');
        editClientFormik?.setFieldValue('address', client?.address ?? '');
        editClientFormik?.setFieldValue('city', client?.city ?? '');
        editClientFormik?.setFieldValue('postalCode', client?.postalCode ?? '');
        editClientFormik?.setFieldValue('documentNumber', client?.documentNumber ?? '');
    }, [client, clientNuit]);

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max lg:col-span-2 lg:gap-8">
                <div className="bg-white rounded-md">
                    <form>
                        <CardContent>
                            <div className="flex flex-col gap-2">

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editClientFormik, 'name', 'Nome', 'Digite o nome do cliente', 'text')} />
                                    <TextField {...generateFieldProps(editClientFormik, 'surname', 'Apelido', 'Digite o apelido do cliente', 'text')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editClientFormik, 'nuit', 'Nuit', 'Digite o NUIT do cliente')} />
                                    <TextField {...generateFieldProps(editClientFormik, 'documentNumber', 'Número de Documento', 'Digite o número de documento do cliente')} />
                                    <TextField {...generateFieldProps(editClientFormik, 'phone', 'Celular', 'Digite o celular do cliente', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editClientFormik, 'email', 'Email', 'Digite o email do cliente', 'email')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editClientFormik, 'address', 'Endereço', 'Digite o endereço do cliente', 'text')} />
                                    <TextField {...generateFieldProps(editClientFormik, 'city', 'Cidade', 'Digite a cidade do cliente', 'text')} />
                                    <TextField {...generateFieldProps(editClientFormik, 'postalCode', 'Código Postal', 'Digite o código postal do cliente', 'text')} />
                                </div>
                            </div>
                        </CardContent>
                    </form>
                    <div className="flex items-end justify-end gap-2 mt-2 mb-2 mr-2">
                        <Button variant="outline" onClick={() => navigate.back()}>
                            CANCELAR
                        </Button>
                        <Button
                            onClick={() => editClientFormik.submitForm()}
                            disabled={!editClientFormik.isValid || isPending}
                        >
                            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                            ADICIONAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditClientForm;