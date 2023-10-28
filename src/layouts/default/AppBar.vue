<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-btn href="/" variant="outlined">POSify</v-btn>
    </v-app-bar-title>
    <div class="ma-3">
      <v-btn
        variant="outlined"
        size="small"
        @click.stop="table = !table"
        prepend-icon="mdi-room-service"
      >
        <template v-slot:append>
          <p>{{ activeTables }}</p>
        </template>
      </v-btn>
    </div>
    <v-btn
      variant="outlined"
      size="small"
      @click.stop="cart = !cart"
      prepend-icon="mdi-cart"
    >
      <template v-slot:append>
        {{ cartData.length }}
      </template>
    </v-btn>
    <ThemeSwitcher />
  </v-app-bar>

  <NavPanel :drawer="drawer">
    <v-main style="height: 100%; padding-top: 5%; padding-bottom: 5%">
      <slot></slot>
    </v-main>
  </NavPanel>
  <Cart :cart="cart" />
  <TableCard :cardToggle="table" />
</template>

<script lang="ts">
import Cart from "@/components/cart/Cart.vue";
import TableCard from "@/components/table/TableCard.vue";
import NavPanel from "@/components/navigation/NavPanel.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { cartData } from "@/store/modules/cart";
import { Table } from "@/types/table";
import { fetchAllTables } from "@/services/tables";

export default {
  setup() {
    return {
      cartData,
    };
  },
  data() {
    return {
      drawer: false,
      cart: false,
      table: false,
      selection: "",
      activeTables: 0,
    };
  },
  methods: {
    async fetchTables() {
      const userId = 1;
      const tables = await fetchAllTables(userId);
      this.activeTables = tables.filter(
        (item: Table) => item.status === "AVAILABLE"
      ).length;
    },
  },
  mounted() {
    this.fetchTables();
  },
  components: {
    Cart,
    TableCard,
    NavPanel,
    ThemeSwitcher,
  },
};
</script>
