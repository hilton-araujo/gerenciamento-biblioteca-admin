export const API_ENDPOINTS = {

    //GET SEM PARAMETROS
    GET_BOOKS: "/book",
    GET_CATEGORIES: "/category",
    GET_CLIENTS: "/client",
    GET_WORKFLOW: "/workflow",
    GET_EMPLOYEES: "/employee",
    GET_STAGE: "/stage",
    GET_TASK: "/task",
    GET_ORDER_TYPE: "/order-type",

    //Enums
    GET_ENUM_ORDER_TYPE: "/enums/order-type",
    DOCUMENTS_TYPES: "/enums/document-type",

    //GET COM PARAMETROS
    GET_BOOK_BY_ID: (id: string) => `/book/${id}`,
    GET_CATEGORY_BY_ID: (code: string) => `/category/${code}`,
    GET_CLIENT_BY_NUIT: (nuit: string) => `/client/${nuit}/details`,

    //POST
    ADD_BOOK: `/book`,
    LOGIN: `/login`,
    ADD_CATEGORIES: `/category`,
    ADD_CLIENT: `/client`,
    ADD_WORKFLOW: `/workflow`,
    ADD_STAGE: `/stage`,
    ADD_TASK_COLABORATOR: `/task`,
    ADD_ORDER_TYPE: `/order-type`,

    //PUT
    EDI_CATEGORY: `/category`,
    EDIT_CLIENT: `/client`,
    EDIT_BOOK: `/book`,
    UPDATE_WORKFLOW: `/workflow`,
    UPDATE_STAGE: `/stage`,
    UPDATE_TASK_COLABORATOR: `/task`,

}