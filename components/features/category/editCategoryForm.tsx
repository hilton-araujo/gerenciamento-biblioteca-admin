import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { usePut } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';
import { Category } from '@/model/category'
import { CardContent } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'

type Props = {
    category: Category
    categoryId: string
}

const EditCategoryForm = ({ category, categoryId }: Props) => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        EditCategorieFormik?.setSubmitting(false);
        EditCategorieFormik?.resetForm()
        navigate.push("/admin/category");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        EditCategorieFormik?.setSubmitting(false);
    };

    const { put, isPending } = usePut({
        endpoint: API_ENDPOINTS.ADD_CATEGORIES,
        successAction: (data) => {
            handleSuccess(data)
        },
        errorAction: (error) => {
            handleError(error)
        }
    })

    const editBookSchema = Yup.object().shape({
        category: Yup.string().required('A designação da categoria e obrigátoria'),
    });


    const EditCategorieFormik = useFormik({
        initialValues: {
            code: categoryId || "",
            category: category?.category || "",
        },
        validationSchema: editBookSchema,
        onSubmit: (values) => {
            put(values)
        },
    })

    useEffect(() => {
        EditCategorieFormik.setFieldValue("category", category?.category || "");
    }, [category])

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max lg:col-span-2 lg:gap-8">
                <div className="py-6 bg-white rounded-md ">
                    <form>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3">
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Categoria"
                                        placeholder='Categoria'
                                        variant="outlined"
                                        name='category'
                                        value={EditCategorieFormik.values.category}
                                        onChange={EditCategorieFormik.handleChange}
                                        onBlur={EditCategorieFormik.handleBlur}
                                        error={EditCategorieFormik.touched.category && Boolean(EditCategorieFormik.errors.category)}
                                        helperText={EditCategorieFormik.touched.category && EditCategorieFormik.errors.category}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </form>
                    <div className="flex items-center justify-end gap-2 mt-2 mr-2">
                        <Button
                            variant="outline"
                            onClick={() => navigate.back()}
                        >
                            CANCELAR
                        </Button>

                        <Button
                            type='submit'
                            onClick={() => EditCategorieFormik.submitForm()}
                            disabled={!EditCategorieFormik.isValid || isPending}
                        >
                            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                            EDITAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryForm