<template>
  <v-container>
    <v-row class="justify-center">
      <AddItem />
      <AddCategory />
    </v-row>
  </v-container>
    <Categories />
</template>

<script lang="ts" setup>
import AddCategory from "@/components/add/AddCategory.vue";
import AddItem from "@/components/add/AddItem.vue";
import Categories from "@/components/category/Categories.vue";
</script>
