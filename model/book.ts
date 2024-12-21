export interface Book {
    id: string;
    title: string;
    author: string;
    image: string;
    description: string;
    genre?: string;
    publishYear?: number;
    pageCount?: number;
    rating?: number;
    availableQuantity: number;
}