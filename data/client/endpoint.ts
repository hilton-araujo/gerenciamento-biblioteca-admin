export const API_ENDPOINTS = {

    //GET SEM PARAMETROS
    GET_BOOKS: "/book",
    GET_CATEGORIES: "/genero",

    //GET COM PARAMETROS\
    GET_BOOK_BY_ID: (id: string) => `/book/${id}`,

    //POST
    ADD_BOOK: `/book`,
    LOGIN: `/login`,

    //PUT
}