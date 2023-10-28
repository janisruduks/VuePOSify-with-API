
export interface Table {
    tableId: number,
    name: string,
    status: string,
    orderId: number,
    userId: number,
}

export type NewTable = {
    name: string
}