import { Category } from "./category"

export type NewItem = {
    title: string,
    price: number,
    description: string,
    imageUrl: string,
    categoryId: number,
    userId: number,
}

export type Item = {
    itemId: number,
    title: string,
    price: number,
    description: string,
    imageUrl: string,
    userId: number,
    // change this later to category
    categoryId: Category
}