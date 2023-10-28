import { fetchData, API_URL } from "./api";
import { Category, NewCategory } from "@/types/category";

const CATEGORY_API_URL = `${API_URL}categories/`

export async function fetchAllCategories(userId: number): Promise<Category[]> {
    try {
        return await fetchData(`${CATEGORY_API_URL + userId}`, "GET");
    } catch (error) {
        console.log("Error fetching categories:", error);
        throw error;
    }
}

export async function postCategory(userId: number, body: NewCategory) {
    try {
        return await fetchData(`${CATEGORY_API_URL + userId}`, "POST", body);
    } catch (error) {
        console.log("Error creating new category:", error);
        throw error;
    }
}

export async function deleteCategory(categoryId: number) {
    try {
        console.log(`${CATEGORY_API_URL + categoryId}`)
        return await fetchData(`${CATEGORY_API_URL + categoryId}`, "DELETE");
    } catch (error) {
        console.log("Error deleting item:", error);
        throw error;
    }
}