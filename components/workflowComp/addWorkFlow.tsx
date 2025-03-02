import { generateFieldProps } from '@/components/generateFieldProps'
import { Button } from '@/components/ui/button'
import { CardContent, TextField } from '@mui/material'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FormikProps } from 'formik'
import React from 'react'

interface Props {
    formik: FormikProps<any>
    isPending: boolean
}

const AddWorkFlow = ({ formik, isPending }: Props) => {
    return (
        <div>
            <form>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        <TextField {...generateFieldProps(formik, 'designation', 'Designação', 'Digite a designação do workflow')} />
                        <TextField {...generateFieldProps(formik, 'description', 'Descrição', 'Digite a descrição do workflow')} />
                    </div>
                </CardContent>
            </form>
            <div className="mt-2 flex items-center justify-end gap-2">
                <Button type="submit" onClick={formik.submitForm} disabled={!formik.isValid || isPending}>
                    {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                    ADICIONAR
                </Button>
            </div>
        </div>
    )
}

export default AddWorkFlow