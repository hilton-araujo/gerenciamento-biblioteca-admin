import React from 'react'
import { CardContent } from '../ui/card'
import { MenuItem, TextField } from '@mui/material'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useGet, usePost } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';

const AddBookForm = () => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        addBookFormik?.setSubmitting(false);
        addBookFormik?.resetForm()
        navigate.push("/admin/book");
    };

    const handleError = (error: any) => {
        toast({
            title: "Erro",
            description: error.response.data.message,
            variant: "destructive"
        });
        addBookFormik?.setSubmitting(false);
    };

    const { post, isPending } = usePost({
        endpoint: API_ENDPOINTS.ADD_BOOK,
        successAction: (data) => {
            handleSuccess(data)
        },
        errorAction: (error) => {
            handleError(error)
        }
    })

    const addBookSchema = Yup.object().shape({
        titulo: Yup.string().required('Título é obrigatório'),
        autor: Yup.string().required('Autor é obrigatório'),
        generoId: Yup.string().required('Gênero é obrigatório'),
        image: Yup.string().url('URL inválida').required('Imagem é obrigatória'),
        description: Yup.string().notRequired(),
        publishYear: Yup.number().min(1000, 'Ano inválido').required('Ano de publicação é obrigatório'),
        pageCount: Yup.number().min(1, 'Deve ter pelo menos 1 página').required('Quantidade de páginas é obrigatória'),
        availableQuantity: Yup.number().min(1, 'Quantidade deve ser maior que 0').required('Quantidade disponível é obrigatória'),
    });


    const addBookFormik = useFormik({
        initialValues: {
            titulo: "",
            autor: "",
            generoId: "",
            image: "",
            description: "",
            publishYear: null,
            pageCount: null,
            availableQuantity: null
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
                                        value={addBookFormik.values.titulo}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.titulo && Boolean(addBookFormik.errors.titulo)}
                                        helperText={addBookFormik.touched.titulo && addBookFormik.errors.titulo}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Autor"
                                        placeholder='Digite o autor do livro'
                                        variant="outlined"
                                        name='autor'
                                        value={addBookFormik.values.autor}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.autor && Boolean(addBookFormik.errors.autor)}
                                        helperText={addBookFormik.touched.autor && addBookFormik.errors.autor}
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
                                        value={addBookFormik.values.generoId}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.generoId && Boolean(addBookFormik.errors.generoId)}
                                        helperText={addBookFormik.touched.generoId && addBookFormik.errors.generoId}
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
                                        type='number'
                                        value={addBookFormik.values.publishYear}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.image && Boolean(addBookFormik.errors.publishYear)}
                                        helperText={addBookFormik.touched.image && addBookFormik.errors.publishYear}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Quantidade de Páginas"
                                        placeholder='Digite a quantidade de páginas do livro'
                                        variant="outlined"
                                        name='pageCount'
                                        type='number'
                                        value={addBookFormik.values.pageCount}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.image && Boolean(addBookFormik.errors.pageCount)}
                                        helperText={addBookFormik.touched.image && addBookFormik.errors.pageCount}
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
                                        type='number'
                                        value={addBookFormik.values.availableQuantity}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.image && Boolean(addBookFormik.errors.availableQuantity)}
                                        helperText={addBookFormik.touched.image && addBookFormik.errors.availableQuantity}
                                    />

                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        fullWidth
                                        label="Imagem"
                                        placeholder='Insira a url da imagem do livro'
                                        variant="outlined"
                                        name='image'
                                        value={addBookFormik.values.image}
                                        onChange={addBookFormik.handleChange}
                                        onBlur={addBookFormik.handleBlur}
                                        error={addBookFormik.touched.image && Boolean(addBookFormik.errors.image)}
                                        helperText={addBookFormik.touched.image && addBookFormik.errors.image}
                                    />
                                </div>

                                <textarea
                                    id="outlined-basic"
                                    placeholder='Digite a descricao do livro'
                                    className='w-full h-24 rounded-md border border-gray-300 p-2'
                                    name='description'
                                    value={addBookFormik.values.description}
                                    onChange={addBookFormik.handleChange}
                                    onBlur={addBookFormik.handleBlur}
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
                            type='submit'
                            onClick={() => addBookFormik.submitForm()}
                            disabled={!addBookFormik.isValid || isPending}
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

export default AddBookForm