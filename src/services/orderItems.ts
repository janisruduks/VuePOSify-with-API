import { OrderedItem } from "@/types/orderedItem";
import { fetchData, API_URL } from "./api";

const ORDER_ITEMS_API_URL = `${API_URL}ordered-items/`

export async function postOrderedItems(body: any) {
    try {
        return await fetchData(`${ORDER_ITEMS_API_URL}`, "POST", body);
    } catch (error) {
        console.log("Error creating new ordered items:", error);
        throw error;
    }
}

export async function fetchOrderItems(orderId: number): Promise<OrderedItem[]> {
  try {
    return await fetchData(`${ORDER_ITEMS_API_URL + orderId}`, "GET");
  } catch (error) {
    console.log("Error fetching order items:", error);
    throw error;
  }
}
