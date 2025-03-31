"use client"

import { TextField } from "@mui/material"
import { ReloadIcon } from "@radix-ui/react-icons"
import type { FormikProps } from "formik"
import { CardContent } from "@/components/shared/ui/card"
import { generateFieldProps } from "@/components/shared/generateFieldProps"
import { Button } from "@/components/shared/ui/button"

interface Props {
    formik: FormikProps<any>
    isPending: boolean
    isEditMode?: boolean
}

const TaskForm = ({ formik, isPending, isEditMode = false }: Props) => {
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="w-full p-2 mt-2 rounded-md shadow-md bg-gray-50">
                    <fieldset className="h-full p-2 space-y-4 bg-white border rounded-lg shadow-md">
                        <legend className="text-lg font-medium ">Dados de Workflow</legend>
                        <div className="flex flex-col gap-2">
                            <TextField
                                {...generateFieldProps(formik, "designation", "Designação", "Digite a designação do workflow")}
                            />
                            <TextField {...generateFieldProps(formik, "description", "Descrição", "Digite a descrição do workflow")} />
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

export default TaskForm