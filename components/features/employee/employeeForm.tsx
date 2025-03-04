import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useGet } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { usePost } from '@/data/hooks'
import { toast } from '@/hooks/use-toast'
import * as Yup from 'yup'
import { CardContent } from '@/components/shared/ui/card'
import { generateFieldProps } from '@/components/shared/generateFieldProps'
import { Button } from '@/components/shared/ui/button'

const EmployeeForm = () => {
    const navigate = useRouter()

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
            variant: "default"
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

    const { data } = useGet({
        endpoint: API_ENDPOINTS.DOCUMENTS_TYPES
    })
    console.log("addEmployeeFormik", addEmployeeFormik?.values);
    console.log("errors", addEmployeeFormik?.errors);

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max">
                <div className="bg-white rounded-md">
                    <form onSubmit={addEmployeeFormik.handleSubmit}>
                        <CardContent>
                            <div className="flex flex-col gap-2">

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'name', 'Nome', 'Digite o nome do cliente', 'text')} />
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'surname', 'Apelido', 'Digite o apelido do cliente', 'text')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'genre', 'Genero', 'Digite o genero do cliente', 'text')} />

                                    <TextField {...generateFieldProps(addEmployeeFormik, 'nuit', 'Nuit', 'Digite o NUIT do cliente')} />

                                    <TextField {...generateFieldProps(addEmployeeFormik, 'documentType', 'Tipo de Documento', 'Digite o tipo de documento do cliente')} select >
                                        {data?.map((item: any) => (
                                            <MenuItem key={item.value} value={item.value}>
                                                {item?.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField {...generateFieldProps(addEmployeeFormik, 'documentNumber', 'Número de Documento', 'Digite o número de documento do cliente')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'position', 'Função', 'Digite a função do cliente', 'text')} />
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'maritalStatus', 'Estado Civil', 'Digite o estado civil do cliente', 'text')} />

                                    <TextField {...generateFieldProps(addEmployeeFormik, 'msidn', 'Contacto', 'Digite o contacto do cliente')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'email', 'Email', 'Digite o email do cliente', 'email')} />
                                    <TextField {...generateFieldProps(addEmployeeFormik, 'senha', 'Senha', 'Digite a senha do cliente', 'password')} />
                                </div>

                            </div>
                        </CardContent>
                    </form>

                    <div className="flex items-center justify-end gap-2 mt-2 mb-2 mr-2">
                        <Button variant="outline" onClick={() => navigate.back()}>
                            CANCELAR
                        </Button>
                        <Button onClick={() => { addEmployeeFormik.handleSubmit() }} type="submit" disabled={!addEmployeeFormik.isValid || isPending}>
                            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                            ADICIONAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm