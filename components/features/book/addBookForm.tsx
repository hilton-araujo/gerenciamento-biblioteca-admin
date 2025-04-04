import React from 'react'
import { MenuItem, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useGet, usePost } from '@/data/hooks'
import { API_ENDPOINTS } from '@/data/client/endpoint'
import { useFormik } from 'formik'
import { toast } from '@/hooks/use-toast'
import { ReloadIcon } from "@radix-ui/react-icons";
import * as Yup from 'yup';
import { Category } from '@/model/category'
import { CardContent } from '@/components/shared/ui/card'
import { generateFieldProps } from '@/components/shared/generateFieldProps'
import { Button } from '@/components/shared/ui/button'

const AddBookForm = () => {
    const navigate = useRouter();

    const handleSuccess = (data: any) => {
        toast({
            title: "Sucesso",
            description: data.message,
        });
        addBookFormik?.setSubmitting(false);
        addBookFormik?.resetForm();
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
        successAction: handleSuccess,
        errorAction: handleError
    });

    const addBookSchema = Yup.object().shape({
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

    const addBookFormik = useFormik({
        initialValues: {
            title: "",
            author: "",
            publisher: "",
            language: "",
            location: "",
            description: "",
            availableQuantity: null,
            pageCount: null,
            publishYear: null,
            rating: null,
            categoryCode: "",
            image: ""
        },
        validationSchema: addBookSchema,
        onSubmit: (values) => {
            post(values);
        },
    });

    const { data } = useGet({ endpoint: API_ENDPOINTS.GET_CATEGORIES });
    const categories = data?.data ?? [];

    return (
        <div className="grid w-full lg:gap-8">
            <div className="grid items-start gap-4 auto-rows-max lg:col-span-2 lg:gap-8">
                <div className="py-6 bg-white rounded-md">
                    <form>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addBookFormik, 'title', 'Título', 'Digite o título do livro')} />
                                    <TextField {...generateFieldProps(addBookFormik, 'author', 'Autor', 'Digite o autor do livro')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addBookFormik, 'publisher', 'Editora', 'Digite a editora do livro')} />
                                    <TextField {...generateFieldProps(addBookFormik, 'language', 'Idioma', 'Digite o idioma do livro')} />
                                    <TextField {...generateFieldProps(addBookFormik, 'location', 'Local', 'Digite o local do livro')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField
                                        {...generateFieldProps(addBookFormik, 'categoryCode', 'Gênero', 'Selecione o gênero do livro')}
                                        select
                                    >
                                        {categories.map((category: Category) => (
                                            <MenuItem key={category.code} value={category.code}>
                                                {category.category}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField {...generateFieldProps(addBookFormik, 'publishYear', 'Ano de Publicação', 'Digite o ano de publicação do livro', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addBookFormik, 'pageCount', 'Número de Páginas', 'Digite o número de páginas do livro', 'number')} />
                                    <TextField {...generateFieldProps(addBookFormik, 'availableQuantity', 'Quantidade Disponível', 'Digite a quantidade disponível', 'number')} />
                                    <TextField {...generateFieldProps(addBookFormik, 'rating', 'Avaliação', 'Digite a avaliação do livro', 'number')} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <TextField {...generateFieldProps(addBookFormik, 'image', 'Imagem', 'Digite a URL da imagem do livro')} />
                                </div>

                                <textarea
                                    className="w-full h-24 p-2 border border-gray-300 rounded-md"
                                    placeholder="Digite a descrição do livro"
                                    name="description"
                                    value={addBookFormik.values.description}
                                    onChange={addBookFormik.handleChange}
                                    onBlur={addBookFormik.handleBlur}
                                />
                            </div>
                        </CardContent>
                    </form>

                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button variant="outline" onClick={() => navigate.back()}>
                            CANCELAR
                        </Button>
                        <Button type="submit" onClick={addBookFormik.submitForm} disabled={!addBookFormik.isValid || isPending}>
                            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                            ADICIONAR
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookForm;
