<template>
  <v-sheet fluid max-width="100%" min-width="300" width="400">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-start align-center">
              <v-icon icon="mdi-shape" size="large" start />
              Add category
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field
            hide-details
            placeholder="Category name"
            v-model="newCategoryName"
          >
          </v-text-field>
          <v-btn type="submit" block class="mt-2" @click="submitNewCategory"
            >Submit</v-btn
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { postCategory } from "@/services/category";

export default {
  data: () => ({
    newCategoryName: "",
  }),
  methods: {
    async submitNewCategory() {
      const userId = 1;
      if (this.newCategoryName !== "") {
        await postCategory(userId, { name: this.newCategoryName });
        this.newCategoryName = "";
      }
    },
  },
};
</script>
