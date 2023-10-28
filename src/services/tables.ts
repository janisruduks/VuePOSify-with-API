import { fetchData, API_URL } from "./api";
import { Table, NewTable } from "@/types/table";

const TABLES_API_URL = `${API_URL}tables/`

export async function fetchAllTables(userId: number): Promise<Table[]> {
    try {
        return await fetchData<Table[]>(`${TABLES_API_URL + userId}`, "GET");
    } catch (error) {
        console.log("Error fetching tables:", error)
        throw error;
    }
}
export async function changeTableStatus(tableId: number) {
    try {
        return await fetchData(`${API_URL}status-update/${tableId}`, "PATCH");
    } catch (error) {
        console.log("Error changing table status", error);
        throw error;
    }
}

export async function postTable(userId: number, body: NewTable) {
    try {
        return await fetchData(`${API_URL + userId}`, "POST", body);
    } catch (error) {
        console.log("Error creating new table:", error);
        throw error;
    }
}