export const API_ENDPOINTS = {

    //GET SEM PARAMETROS
    GET_BOOKS: "/book",
    GET_CATEGORIES: "/category",

    //GET COM PARAMETROS\
    GET_BOOK_BY_ID: (id: string) => `/book/${id}`,
    GET_CATEGORY_BY_ID: (code: string) => `/category/${code}`,

    //POST
    ADD_BOOK: `/book`,
    LOGIN: `/login`,
    ADD_CATEGORIES: `/category`,

    //PUT
}