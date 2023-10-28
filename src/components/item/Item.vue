<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <Selector
        v-model="selection"
        :items="categoryData"
        :enable-sub="false"
        item-title="name"
        label="Select category"
      />
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in categoryFilter" :key="i" cols="12" md="3">
          <v-card variant="outlined" class="rounded" @click="addItemToCart(item)">
            <slot name="card" :card="item"></slot>
            <v-img height="200" :src="item.imageUrl"></v-img>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
            <v-btn class="ma-2" variant="outlined"
              >price: {{ item.price }}$</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import Selector from "@/components/category/Selector.vue";
import { fetchAllCategories } from "@/services/category";
import { fetchAllItems } from "@/services/item";
import { cartData } from "@/store/modules/cart";
import { CartItem } from "@/types/cart";
import { Item } from "@/types/item";
export default {
  setup() {
    return {
      cartData,
    };
  },
  data() {
    return {
      itemData: [] as Item[],
      categoryData: [] as String[],
      selection: "",
    };
  },
  methods: {
    async fetchItems() {
      const userId = 1;
      this.itemData = await fetchAllItems(userId);
    },
    async fetchCategories() {
      const userId = 1;
      const response = await fetchAllCategories(userId);
      this.categoryData = response.map(category => category.name);
    },
    addItemToCart(item: Item) {
      const cartItem: CartItem = {
        orderId: -1,
        userId: item.userId,
        itemId: item.itemId,
        quantity: 1,
        name: item.title,
        price: item.price,
        total: item.price,
      };
      cartData.value.push(cartItem);
    },
  },
  computed: {
    categoryFilter() {
      return this.itemData.filter(
        (item: Item) => item.categoryId.name == this.selection
      );
    },
  },
  mounted() {
    this.fetchItems();
    this.fetchCategories();
  },
  components: { Selector },
};
</script>
