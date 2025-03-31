import { generateFieldProps } from '@/components/shared/generateFieldProps'
import { Button } from '@/components/shared/ui/button'
import { TextField } from '@mui/material'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FormikProps } from 'formik'
import React from 'react'

interface Props {
    formik: FormikProps<any>
    isPending: boolean
    isEditMode?: boolean
}

const OrderTypeForm = ({ formik, isPending, isEditMode = false }: Props) => {
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="w-full p-2 mt-2 rounded-md shadow-md bg-gray-50">
                    <fieldset className="h-full p-2 space-y-4 bg-white border rounded-lg shadow-md">
                        <legend className="text-lg font-medium ">Dados de Tipo de Pedido</legend>
                        <div className="flex flex-col gap-2">
                            <TextField
                                {...generateFieldProps(formik, "designation", "Designação", "Digite a designação do tipo de pedido")}
                            />
                        </div>
                    </fieldset>
                </div>
            </form>
            <div className="flex items-center justify-end gap-2 mt-2">
                <Button type="submit" onClick={formik.submitForm} disabled={!formik.isValid || isPending}>
                    {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                    {isEditMode ? "EDITAR" : "ADICIONAR"}
                </Button>
            </div>
        </div>
    )
}

export default OrderTypeForm