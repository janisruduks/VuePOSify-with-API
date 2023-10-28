<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <Selector
        v-model="selection"
        :items="categoryData"
        :enable-sub="false"
        label="Filter category"
        item-value="categoryId"
      />
    </v-container>
    <slot name="main" :selection="selection"></slot>
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in categoryFilter" :key="i" cols="12" md="3">
          <v-card variant="outlined" class="rounded" @click="cardClick(item)">
            <slot name="card" :itemId="item.itemId"></slot>
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
import { Item } from "@/types/item";
import { Category } from "@/types/category";
import { fetchAllCategories } from "@/services/category"
import { fetchAllItems } from "@/services/item";
export default {
  props: {
    cardClick: {
      type: Function,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    selection: "",
    categoryData: [] as Category[],
    itemData: [] as Item[],
  }),
  methods: {
    async fetchCategories() {
      const userId = 1;
      this.categoryData = await fetchAllCategories(userId)
    },
    async fetchItems() {
      const userId = 1;
      this.itemData = await fetchAllItems(userId);
    },
  },
  computed: {
    categoryFilter() {
      return this.itemData.filter(
        (item: Item) => item.categoryId.categoryId === this.selection
      );
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchItems();
  },
  components: { Selector },
};
</script>
