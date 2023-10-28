import { fetchData, API_URL } from "./api";
import { Order, NewOrder } from "@/types/order";

const ORDER_API_URL = `${API_URL}orders/`

export async function postOrder(userId: number, body: NewOrder): Promise<Order> {
    try {
        return await fetchData(`${ORDER_API_URL + userId}`, "POST", body);
    } catch (error) {
        console.log("Error creating new order:", error);
        throw error;
    }
}

export async function fetchOrders(userId: number): Promise<Order[]> {
  try {
      return await fetchData(`${ORDER_API_URL + userId}`, "GET");
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
}
