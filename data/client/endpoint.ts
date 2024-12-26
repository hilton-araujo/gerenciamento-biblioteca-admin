export const API_ENDPOINTS = {

    //GET SEM PARAMETROS
    GET_BOOKS: "/book",
    GET_CATEGORIES: "/category",
    GET_CLIENTS: "/client",

    //GET COM PARAMETROS
    GET_BOOK_BY_ID: (id: string) => `/book/${id}`,
    GET_CATEGORY_BY_ID: (code: string) => `/category/${code}`,
    GET_CLIENT_BY_NUIT: (code: string) => `/client/${code}`,

    //POST
    ADD_BOOK: `/book`,
    LOGIN: `/login`,
    ADD_CATEGORIES: `/category`,
    ADD_CLIENT: `/client`,

    //PUT
    EDI_CATEGORY: `/category`,
    EDIT_CLIENT: `/client`,
    EDIT_BOOK: `/book`

}