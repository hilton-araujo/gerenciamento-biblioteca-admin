import React, { useEffect } from 'react'
import { CardContent } from '../ui/card'
import { MenuItem, TextField } from '@mui/material'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useGet, usePost, usePut } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup'

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

    const findCategory = (genero: string) => {
        return categories.find((category: any) => category.genero === genero)?.id
    }

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
        titulo: Yup.string().required('O título é obrigatório'),
        autor: Yup.string().required('O autor é obrigatório'),
        generoId: Yup.string().required('O gênero é obrigatório'),
        publishYear: Yup.number().required('O ano de publicação é obrigatório'),
        pageCount: Yup.number().required('A quantidade de páginas é obrigatória'),
        availableQuantity: Yup.number().required('A quantidade disponível é obrigatória'),
        image: Yup.string().url('Insira uma URL válida'),
    });

    const editBookFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: bookId,
            titulo: book?.title || "",
            autor: book?.author || "",
            generoId: findCategory(book?.genre || "") || "",
            image: book?.image || "",
            description: book?.description || "",
            publishYear: book?.publishYear || 0,
            pageCount: book?.pageCount || 0,
            availableQuantity: book?.availableQuantity || 0
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
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Título"
                                        placeholder='Digite o titulo do livro'
                                        variant="outlined"
                                        name='titulo'
                                        value={editBookFormik.values.titulo}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.titulo && Boolean(editBookFormik.errors.titulo)}
                                        helperText={editBookFormik.touched.titulo && Boolean(editBookFormik.errors.titulo)}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Autor"
                                        placeholder='Digite o autor do livro'
                                        variant="outlined"
                                        name='autor'
                                        value={editBookFormik.values.autor}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.autor && Boolean(editBookFormik.errors.autor)}
                                        helperText={editBookFormik.touched.autor && Boolean(editBookFormik.errors.autor)}
                                    />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        select
                                        label="Genero"
                                        placeholder='Digite o genero do livro'
                                        variant="outlined"
                                        name='generoId'
                                        value={editBookFormik.values.generoId}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.generoId && Boolean(editBookFormik.errors.generoId)}
                                        helperText={editBookFormik.touched.generoId && Boolean(editBookFormik.errors.generoId)}
                                    >
                                        {categories?.map((category: any) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.genero}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Ano de Publicação"
                                        placeholder='Digite o ano de publicação do livro'
                                        variant="outlined"
                                        name='publishYear'
                                        value={editBookFormik.values.publishYear}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.image && Boolean(editBookFormik.errors.publishYear)}
                                        helperText={editBookFormik.touched.image && Boolean(editBookFormik.errors.publishYear)}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Quantidade de Páginas"
                                        placeholder='Digite a quantidade de páginas do livro'
                                        variant="outlined"
                                        name='pageCount'
                                        value={editBookFormik.values.pageCount}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.image && Boolean(editBookFormik.errors.pageCount)}
                                        helperText={editBookFormik.touched.image && Boolean(editBookFormik.errors.pageCount)}
                                    />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Quantidede disponível"
                                        placeholder='Digite a quantidade disponível do livro'
                                        variant="outlined"
                                        name='availableQuantity'
                                        value={editBookFormik.values.availableQuantity}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.image && Boolean(editBookFormik.errors.availableQuantity)}
                                        helperText={editBookFormik.touched.image && Boolean(editBookFormik.errors.availableQuantity)}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Imagem"
                                        placeholder='Insira a url da imagem do livro'
                                        variant="outlined"
                                        name='image'
                                        value={editBookFormik.values.image}
                                        onChange={editBookFormik.handleChange}
                                        onBlur={editBookFormik.handleBlur}
                                        error={editBookFormik.touched.image && Boolean(editBookFormik.errors.image)}
                                        helperText={editBookFormik.touched.image && Boolean(editBookFormik.errors.image)}
                                    />
                                </div>

                                <textarea
                                    id="outlined-basic"
                                    placeholder='Digite a descricao do livro'
                                    className='w-full h-24 rounded-md border border-gray-300 p-2'
                                    name='description'
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

export default EditBookForm