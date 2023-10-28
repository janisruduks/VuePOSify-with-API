import { Table } from "./table";

export type NewOrder = {
  tableId: string;
};

export type Order = {
  orderId: number;
  timeOpen: Date;
  timeClosed: Date;
  orderTotal: number;
  status: string;
  userId: number;
  table: Table;
};
