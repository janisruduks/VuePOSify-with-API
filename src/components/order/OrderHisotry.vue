<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="orderData"
    :sort-by="sortBy"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="showOrderItems(item.selectable.orderId)"
      >
        mdi-receipt-text
      </v-icon>
      <v-button @click="test(item.selectable)">test</v-button>

      <v-overlay
        v-model="isOrderItemsOverlayVisible"
        class="position-absolute d-flex align-center justify-center w-100 h-100"
      >
        <v-card
          :title="'Receipt: ' + item.selectable.table.name"
          :subtitle="'Order id: ' + item.selectable.orderId"
        >
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in orderItemData" :key="i">
                  <td>{{ item.item.title }}</td>
                  <td>{{ item.item.price }}$</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.item.price * item.quantity }}$</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-overlay>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Order } from "@/types/order";
import { fetchOrderItems } from "@/services/orderItems";
import { fetchOrders } from "@/services/order";
import { OrderedItem } from "@/types/orderedItem";
import { Item } from "@/types/item";
import { DataTableHeader, SortItem } from "@/types/data-table"
export default {
  data() {
    return {
      orderData: [] as Order[],
      orderItemData: [] as OrderedItem[],
      isOrderItemsOverlayVisible: false,
      selectedOrderItems: null,
      itemsPerPage: 10,
      orderItem: null,
      orderTotal: 0,
      headers: [
        {
          title: "Order name",
          align: "start",
          sortable: false,
          key: "table.name",
        },
        { title: "ID", align: "end", key: "orderId" },
        { title: "Time Open", align: "end", key: "timeOpen" },
        { title: "Status", align: "end", key: "status" },
        { title: "Time Closed", align: "end", key: "timeClosed" },
        { title: "Order Total", align: "end", key: "orderTotal" },
        { title: "Actions", key: "actions", sortable: false },
      ] as DataTableHeader[],
      sortBy: [{ key: "orderId", order: "desc" }] as SortItem[],
    };
  },
  methods: {
    test(item: Item) {
      console.log(item);
    },
    async fetchOrderData() {
      const userId = 1;
      this.orderData = await fetchOrders(userId);
    },
    async fetchOrderItemsData(orderId: number) {
      this.orderItemData = await fetchOrderItems(orderId);
    },
    showOrderItems(orderId: number) {
      this.fetchOrderItemsData(orderId);
      this.isOrderItemsOverlayVisible = true;
    },
    closeOrderItemsOverlay() {
      this.orderItemData = [];
      this.isOrderItemsOverlayVisible = false;
    },
  },
  mounted() {
    this.fetchOrderData();
  },
};
</script>
