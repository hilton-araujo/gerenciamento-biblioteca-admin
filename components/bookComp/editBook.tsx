import React from 'react'
import { CardContent } from '../ui/card'
import { MenuItem, TextField } from '@mui/material'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useGet, usePut } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { FormikProps, useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup'
import { Category } from '@/model/category'

interface Props {
    bookId: string
}

const EditBookForm = ({ bookId }: Props) => {
    const navigate = useRouter();

    const { data: bookData } = useGet({
        endpoint: API_ENDPOINTS.GET_BOOK_BY_ID(bookId)
    })
    const book = bookData?.data ?? {}

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_CATEGORIES
    })
    const categories = data?.data ?? []

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        editBookFormik?.setSubmitting(false);
        editBookFormik?.resetForm()
        navigate.push("/admin/book");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        editBookFormik?.setSubmitting(false);
    };

    const { put, isPending } = usePut({
        endpoint: API_ENDPOINTS.ADD_BOOK,
        successAction: (data) => {
            handleSuccess(data)
        },
        errorAction: (error) => {
            handleError(error)
        }
    })

    const editBookSchema = Yup.object({
        title: Yup.string().required("Título é obrigatório"),
        author: Yup.string().required("Autor é obrigatório"),
        publisher: Yup.string().required("Editora é obrigatório"),
        language: Yup.string().required("Idioma é obrigatório"),
        location: Yup.string().required("Local é obrigatório"),
        availableQuantity: Yup.number().required("Quantidade disponível é obrigatória"),
        pageCount: Yup.number().required("Número de páginas é obrigatório"),
        publishYear: Yup.number().required("Ano de publicação é obrigatório"),
        rating: Yup.number().required("Avaliação é obrigatória"),
        categoryCode: Yup.string().required("Categoria é obrigatória"),
        image: Yup.string().required("Imagem é obrigatória"),
    });

    const editBookFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: bookId,
            title: book?.title || "",
            author: book?.author || "",
            categoryCode: book?.categoryCode || "",
            isbn: book?.isbn || "",
            image: book?.image || "",
            description: book?.description || "",
            publishYear: book?.publishYear || null,
            pageCount: book?.pageCount || null,
            availableQuantity: book?.availableQuantity || null,
            publisher: book?.publisher || "",
            language: book?.language || "",
            location: book?.location || "",
            rating: book?.rating || null,
        },
        validationSchema: editBookSchema,
        onSubmit: (values) => {
            put(values);
        },
    });

    return (
        <div className="grid  w-full lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <div className=" rounded-md bg-white py-6">
                    <form>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editBookFormik, 'title', 'Título', 'Digite o título do livro')} />
                                    <TextField {...generateFieldProps(editBookFormik, 'author', 'Autor', 'Digite o autor do livro')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editBookFormik, 'publisher', 'Editora', 'Digite a editora do livro')} />
                                    <TextField {...generateFieldProps(editBookFormik, 'language', 'Idioma', 'Digite o idioma do livro')} />
                                    <TextField {...generateFieldProps(editBookFormik, 'location', 'Local', 'Digite o local do livro')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField
                                        {...generateFieldProps(editBookFormik, 'categoryCode', 'Gênero', 'Selecione o gênero do livro')}
                                        select
                                    >
                                        {categories.map((category: Category) => (
                                            <MenuItem key={category.code} value={category.code}>
                                                {category.category}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField {...generateFieldProps(editBookFormik, 'publishYear', 'Ano de Publicação', 'Digite o ano de publicação do livro', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editBookFormik, 'pageCount', 'Número de Páginas', 'Digite o número de páginas do livro', 'number')} />
                                    <TextField {...generateFieldProps(editBookFormik, 'availableQuantity', 'Quantidade Disponível', 'Digite a quantidade disponível', 'number')} />
                                    <TextField {...generateFieldProps(editBookFormik, 'rating', 'Avaliação', 'Digite a avaliação do livro', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(editBookFormik, 'image', 'Imagem', 'Digite a URL da imagem do livro')} />
                                </div>

                                <textarea
                                    className="w-full h-24 rounded-md border border-gray-300 p-2"
                                    placeholder="Digite a descrição do livro"
                                    name="description"
                                    value={editBookFormik.values.description}
                                    onChange={editBookFormik.handleChange}
                                    onBlur={editBookFormik.handleBlur}
                                />
                            </div>
                        </CardContent>
                    </form>

                    <div className="mt-2 flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => navigate.back()}
                        >
                            CANCELAR
                        </Button>

                        <Button
                            onClick={() => editBookFormik.submitForm()}
                            disabled={!editBookFormik.isValid || isPending}
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

function generateFieldProps(
    formik: FormikProps<any>,
    name: string,
    label: string,
    placeholder: string,
    type: 'text' | 'number' | 'password' | 'email' = 'text'
) {
    return {
        id: name,
        name,
        label,
        placeholder,
        type,
        size: 'small' as const,
        fullWidth: true,
        variant: 'outlined' as const,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && typeof formik.errors[name] === 'string'
            ? formik.errors[name]
            : undefined,
    };
}

export default EditBookForm