<template>
  <v-select
    class="pa-3"
    variant="outlined"
    v-model="selectedValue"
    :label="label"
    :items="items"
    :item-value="itemValue"
    item-title="name"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :subtitle="enableSub ? item.raw.status : ''"
      ></v-list-item>
    </template>
  </v-select>
</template>
<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    value: String,
    items: Array as PropType<Array<any>>,
    enableSub: Boolean,
    label: String,
    itemTitle: String,
    itemValue: String,
  },
  data() {
    return {
      selectedValue: this.value,
    };
  },
  watch: {
    selectedValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
