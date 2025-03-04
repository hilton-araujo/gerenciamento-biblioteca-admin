import React from 'react'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useGet, usePost } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';
import { CardContent } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'

const AddCategorieForm = () => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        AddCategorieFormik?.setSubmitting(false);
        AddCategorieFormik?.resetForm()
        navigate.push("/admin/category");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        AddCategorieFormik?.setSubmitting(false);
    };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.ADD_CATEGORIES,
        successAction: (data) => {
            handleSuccess(data)
        },
        errorAction: (error) => {
            handleError(error)
        }
    })

    const addBookSchema = Yup.object().shape({
        category: Yup.string().required('A designação do category e obrigátoria'),
    });


    const AddCategorieFormik = useFormik({
        initialValues: {
            category: "",
        },
        validationSchema: addBookSchema,
        onSubmit: (values) => {
            post(values)
        },
    })

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CATEGORIES
    })
    const categories = data?.data ?? []

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
                                        value={AddCategorieFormik.values.category}
                                        onChange={AddCategorieFormik.handleChange}
                                        onBlur={AddCategorieFormik.handleBlur}
                                        error={AddCategorieFormik.touched.category && Boolean(AddCategorieFormik.errors.category)}
                                        helperText={AddCategorieFormik.touched.category && AddCategorieFormik.errors.category}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </form>
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button
                            variant="outline"
                            onClick={() => navigate.back()}
                        >
                            CANCELAR
                        </Button>

                        <Button
                            type='submit'
                            onClick={() => AddCategorieFormik.submitForm()}
                            disabled={!AddCategorieFormik.isValid || isPending}
                        >
                            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                            ADICIONAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategorieForm