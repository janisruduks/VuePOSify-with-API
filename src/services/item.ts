import { Item, NewItem } from "@/types/item";
import { fetchData, API_URL } from "./api";

const ITEM_API_URL = `${API_URL}items/`

export async function postItem(userId: number, body: NewItem): Promise<Item> {
    try {
        return await fetchData(`${ITEM_API_URL + userId}`, "POST", body);
    } catch (error) {
        console.log("Error creating item:", error);
        throw error;
    }
}

export async function deleteItem(itemId: number) {
    try {
        return await fetchData(`${ITEM_API_URL + itemId}`, "DELETE");
    } catch (error) {
        console.log("Error deleting item:", error);
        throw error;
    }
}

export async function fetchAllItems(userId: number): Promise<Item[]> {
  try {
    return await fetchData(`${ITEM_API_URL + userId}`, "GET");
  } catch (error) {
    console.log("Error fetching items:", error);
    throw error;
  }
}
