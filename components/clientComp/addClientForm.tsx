import { CardContent, TextField } from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { usePost } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';
import { generateFieldProps } from '../generateFieldProps';

const AddClientForm = () => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        addClientFormik?.setSubmitting(false);
        addClientFormik?.resetForm();
        navigate.push("/admin/client");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        addClientFormik?.setSubmitting(false);
    };

    const { post, isPending } = usePost({
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
        documentNumber: Yup.string().required('O número de documento do cliente é obrigatório'),
        senha: Yup.string().required('A senha do cliente é obrigatória'),
    });

    const addClientFormik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            nuit: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            documentNumber: '',
            senha: '',
        },
        validationSchema: addClientSchema,
        onSubmit: (values) => {
            post(values);
        },
    });

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <div className="rounded-md bg-white py-6">
                    <form onSubmit={addClientFormik.handleSubmit}>
                        <CardContent>
                            <div className="flex flex-col gap-2">

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addClientFormik, 'name', 'Nome', 'Digite o nome do cliente', 'text')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'surname', 'Apelido', 'Digite o apelido do cliente', 'text')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addClientFormik, 'nuit', 'Nuit', 'Digite o NUIT do cliente')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'documentNumber', 'Número de Documento', 'Digite o número de documento do cliente')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'phone', 'Celular', 'Digite o celular do cliente', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addClientFormik, 'email', 'Email', 'Digite o email do cliente', 'email')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'senha', 'Senha', 'Digite a senha do cliente', 'password')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addClientFormik, 'address', 'Endereço', 'Digite o endereço do cliente', 'text')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'city', 'Cidade', 'Digite a cidade do cliente', 'text')} />
                                    <TextField {...generateFieldProps(addClientFormik, 'postalCode', 'Código Postal', 'Digite o código postal do cliente', 'text')} />
                                </div>
                            </div>
                        </CardContent>
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={() => navigate.back()}>
                                CANCELAR
                            </Button>
                            <Button type="submit" disabled={!addClientFormik.isValid || isPending}>
                                {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                                ADICIONAR
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddClientForm;