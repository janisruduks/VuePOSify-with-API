<template>
  <div style="padding-left: 2rem; padding-right: 2rem;" >
    <NewCategories />
    <Item />
    <!-- <NewCart :cart="true"/> -->
    <NewAddCategory />
    <NewOrderHisotry />
    <NewAddItem />
  </div>
</template>

<script lang="ts" setup>
import NewOrderHisotry from "@/components/order/NewOrderHisotry.vue";
import Item from "@/components/item/Item.vue";
import NewAddItem from "@/components/add/NewAddItem.vue";
import NewAddCategory from "@/components/add/NewAddCategory.vue";
import NewCategories from "@/components/category/NewCategories.vue";
function x() {
  return 15;
}
</script>
