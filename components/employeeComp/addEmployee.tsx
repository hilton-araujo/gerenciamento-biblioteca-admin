import React from 'react'
import Header from '../header'
import { useRouter } from 'next/navigation'
import EmployeeForm from './employeeForm'
import { useFormik } from 'formik'
import { usePost } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { toast } from '@/hooks/use-toast'
import * as Yup from 'yup'

const AddEmployee = () => {
    const navigate = useRouter()


    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        addEmployeeFormik?.setSubmitting(false);
        addEmployeeFormik?.resetForm();
        navigate.push("/admin/employee");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        addEmployeeFormik?.setSubmitting(false);
    };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.GET_EMPLOYEES,
        successAction: handleSuccess,
        errorAction: handleError
    });

    const addEmployeeSchema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        surname: Yup.string().required("Apelido é obrigatório"),
        genre: Yup.string().required("Genero é obrigatório"),
        email: Yup.string().required("Email é obrigatório"),
        msidn: Yup.string().required("Telefone é obrigatório"),
        position: Yup.string().required("Cargo é obrigatório"),
        nuit: Yup.string().required("NUIT é obrigatório"),
        documentType: Yup.string().required("Tipo de documento é obrigatório"),
        documentNumber: Yup.string().required("Número de documento é obrigatório"),
        senha: Yup.string().required("Senha é obrigatória"),
        maritalStatus: Yup.string().required("Estado civil é obrigatório"),
    });

    const addEmployeeFormik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            genre: '',
            email: '',
            msidn: '',
            position: '',
            nuit: '',
            documentType: '',
            documentNumber: '',
            senha: '',
            maritalStatus: '',
        },
        validationSchema: addEmployeeSchema,
        onSubmit: (values) => {
            post(values);
        },
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col w-full">
                <main className="grid grid-cols-1 flex-1 items-start gap-4 sm:px-6 sm:py-6 md:gap-4">
                    <Header
                        title={'Cadastro de Funcionários'}
                        description={'Faça aqui o cadastro de todos os funcionários.'}
                        addButton={true}
                        buttons={false}
                    />

                    <EmployeeForm formik={addEmployeeFormik} isPending={isPending} />
                </main>
            </div>
        </div>
    )
}

export default AddEmployee