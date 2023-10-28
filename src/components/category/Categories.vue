<template>
  <ItemSearch :card-click="() => null" category="all">
    <template #main="slotProps">
      <v-btn
        @click="removeCategory(slotProps.selection)"
        class="ma-5"
        variant="outlined"
        >delete selected category</v-btn
      >
    </template>
    <template #card="slotProps">
      <v-btn
        @click="removeItem(slotProps.itemId)"
        icon="mdi-delete"
        class="delete-button ma-1"
        style="z-index: 9999"
      ></v-btn>
    </template>
  </ItemSearch>
</template>

<style>
.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
</style>

<script lang="ts">
import ItemSearch from "@/components/item/ItemSearch.vue";
import { deleteItem } from "@/services/item";
import { deleteCategory } from "@/services/category";

export default {
  methods: {
    removeItem(itemId: number) {
      deleteItem(itemId);
    },
    removeCategory(categoryId: number) {
      deleteCategory(categoryId);
    },
  },
  components: { ItemSearch },
};
</script>
