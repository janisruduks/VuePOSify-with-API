<template>
  <v-sheet fluid max-width="100%" min-width="300" width="400">
    <v-expansion-panels>
      <v-expansion-panel @click="fetchCategories">
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-start align-center">
              <v-icon icon="mdi-plus" size="large" start />
              Add item
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field hide-details placeholder="Item name" v-model="title">
          </v-text-field>
          <v-text-field
            hide-details
            placeholder="Item description"
            v-model="description"
          >
          </v-text-field>
          <v-text-field hide-details placeholder="Item price" v-model="price">
          </v-text-field>
          <v-text-field hide-details placeholder="Image url" v-model="imgUrl">
          </v-text-field>
          <v-select
            v-model="selection"
            label="Select category"
            :items="categoryData"
            item-value="categoryId"
            item-title="name"
          >
            <template v-slot:item="{ props }">
              <v-list-item v-bind="props"></v-list-item>
            </template>
          </v-select>
          <v-btn
            type="submit"
            block
            class="mt-2"
            @click="submitNewItem"
            :disabled="loader"
          >
            Submit
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { postItem } from "@/services/item";
import { fetchAllCategories } from "@/services/category";
import { NewItem } from "@/types/item";
import { Category } from "@/types/category";

export default {
  data: () => ({
    title: "",
    description: "",
    price: 0,
    imgUrl: "",
    selection: 0,
    categoryData: [] as Category[],
    loader: false,
  }),
  methods: {
    resetForm() {
      this.title = "";
      this.description = "";
      this.price = 0;
      this.imgUrl = "";
      this.selection = 0;
    },
    async submitNewItem() {
      const userId = 1;
      await postItem(userId, this.createFormItem);
      this.resetForm();
    },
    async fetchCategories() {
      const userId = 1;
      this.categoryData = await fetchAllCategories(userId);
    },
  },
  computed: {
    createFormItem() {
      const item: NewItem = {
        title: this.title,
        description: this.description,
        price: this.price,
        imageUrl: this.imgUrl,
        categoryId: this.selection,
        userId: 1,
      };
      return item;
    },
  },
};
</script>
