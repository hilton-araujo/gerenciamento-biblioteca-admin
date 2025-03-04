import { TextField } from '@mui/material'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FormikProps } from 'formik'
import React from 'react'
import { CardContent } from '@/components/shared/ui/card'
import { generateFieldProps } from '@/components/shared/generateFieldProps'
import { Button } from '@/components/shared/ui/button'

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
            <div className="flex items-center justify-end gap-2 mt-2">
                <Button type="submit" onClick={formik.submitForm} disabled={!formik.isValid || isPending}>
                    {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                    ADICIONAR
                </Button>
            </div>
        </div>
    )
}

export default AddWorkFlow