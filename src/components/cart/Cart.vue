<template>
  <v-fade-transition hide-on-leave>
    <v-card
      v-if="cart"
      class="cart-card pa-3"
      elevation="16"
      max-width="400"
      max-height="600"
      title="Receipt"
    >
      <Selector
        v-model="selection"
        :items="tableData"
        :enable-sub="true"
        label="Select table"
        item-title="name"
        :item-value="'tableId'"
      />
      <CartItem :selection="selection" />
    </v-card>
  </v-fade-transition>
</template>

<style>
.cart-card {
  position: fixed;
  top: 6%;
  right: 1px;
  z-index: 1000;
  overflow: auto;
}
</style>

<script lang="ts">
import { cartData } from "@/store/modules/cart";
import Selector from "../category/Selector.vue";
import CartItem from "./CartItem.vue";
import { fetchAllTables } from "@/services/tables";
import { Table } from "@/types/table";
import { Order } from "@/types/order";

export default {
  setup() {
    return {
      cartData,
    };
  },
  data: () => ({
    selection: "",
    tableData: [] as Table[],
    order: [] as Order[],
  }),
  props: {
    cart: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    isCartOpen() {
      this.$emit("update:cart", !this.cart);
    },
    async fetchTables() {
      const userId = 1;
      this.tableData = await fetchAllTables(userId);
    },
  },
  components: {
    Selector,
    CartItem,
  },
  mounted() {
    this.fetchTables();
  },
};
</script>
