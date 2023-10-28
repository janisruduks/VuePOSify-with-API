import { Item } from "@/store/modules/items"
import { Order } from "./order"

export type OrderedItem = {
    orderedItemsId: number,
    quantity: number,
    userId: number,
    order: Order,
    item: Item,
}