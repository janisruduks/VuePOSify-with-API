<template>
  <v-fade-transition hide-on-leave>
    <v-card
      v-if="cardToggle"
      class="cart-card pa-3"
      elevation="16"
      max-width="500"
      max-height="600"
      title="Tables"
    >
      <TableItems />
    </v-card>
  </v-fade-transition>
</template>

<script lang="ts">
import TableItems from "@/components/table/TableItems.vue";
export default {
  props: {
    cardToggle: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    TableItems,
  },
};
</script>
