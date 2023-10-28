<template>
  <v-sheet fluid max-width="100%" min-width="300">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-start align-center">
              <v-icon icon="mdi-table" size="large" start />
              Add table
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-text-field
            hide-details
            placeholder="Table name"
            v-model="tableName"
          >
          </v-text-field>
          <v-btn type="submit" block class="mt-2" @click="submitNewTable"
            >Submit
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { postTable } from "@/services/tables";

export default {
  data() {
    return {
      tableName: "",
    };
  },
  methods: {
    async submitNewTable() {
      const userId = 1;
      await postTable(userId, { name: this.tableName });
      this.tableName = "";
    },
  },
};
</script>
