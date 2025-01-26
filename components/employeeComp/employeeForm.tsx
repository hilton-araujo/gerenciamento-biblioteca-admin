import { MenuItem, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import { generateFieldProps } from '../generateFieldProps'
import { CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useGet } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'

interface Props {
    formik: FormikProps<any>
    isPending: boolean
}

const EmployeeForm = ({ formik, isPending }: Props) => {
    const navigate = useRouter()

    const { data } = useGet({
        endpoint: API_ENDPOINTS.DOCUMENTS_TYPES
    })

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <div className="rounded-md bg-white py-6">
                    <form onSubmit={formik.handleSubmit}>
                        <CardContent>
                            <div className="flex flex-col gap-2">

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(formik, 'name', 'Nome', 'Digite o nome do cliente', 'text')} />
                                    <TextField {...generateFieldProps(formik, 'surname', 'Apelido', 'Digite o apelido do cliente', 'text')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(formik, 'genre', 'Genero', 'Digite o genero do cliente', 'text')} />

                                    <TextField {...generateFieldProps(formik, 'nuit', 'Nuit', 'Digite o NUIT do cliente')} />

                                    <TextField {...generateFieldProps(formik, 'documentType', 'Tipo de Documento', 'Digite o tipo de documento do cliente')} select >
                                        {data?.map((item: any) => (
                                            <MenuItem key={item.value} value={item.value}>
                                                {item?.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField {...generateFieldProps(formik, 'documentNumber', 'Número de Documento', 'Digite o número de documento do cliente')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(formik, 'position', 'Função', 'Digite a função do cliente', 'text')} />
                                    <TextField {...generateFieldProps(formik, 'maritalStatus', 'Estado Civil', 'Digite o estado civil do cliente', 'text')} />

                                    <TextField {...generateFieldProps(formik, 'msidn', 'Contacto', 'Digite o contacto do cliente')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(formik, 'email', 'Email', 'Digite o email do cliente', 'email')} />
                                    <TextField {...generateFieldProps(formik, 'senha', 'Senha', 'Digite a senha do cliente', 'password')} />
                                </div>

                            </div>
                        </CardContent>
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={() => navigate.back()}>
                                CANCELAR
                            </Button>
                            <Button type="submit" disabled={!formik.isValid || isPending}>
                                {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                                ADICIONAR
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeForm