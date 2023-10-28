<template>
  <v-responsive class="align-center text-center">
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(table, i) in tableData" :key="table.tableId">
            <td>{{ table.name }}</td>
            <td>{{ table.status }}</td>
            <td>
              <v-btn
                :disabled="
                  table.status === 'PAID' || table.status === 'AVAILABLE'
                "
                @click="changeStatus(table)"
                icon="mdi-cash-fast"
                size="small"
                class="ma-3"
                variant="text"
              >
              </v-btn>
              <v-btn
                :disabled="
                  table.status === 'OCCUPIED' || table.status === 'AVAILABLE'
                "
                @click="changeStatus(table)"
                size="small"
                variant="text"
                icon="mdi-table-chair"
              ></v-btn>
            </td>
            <td>
              <slot name="table" v-bind="{ table, i }"></slot>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-responsive>
</template>

<script lang="ts">
import { fetchAllTables, changeTableStatus } from '@/services/tables';
import { Table } from '@/types/table';
export default {
  mounted() {
    this.fetchTables();
  },
  data() {
    return {
      tableData: [] as Table[],
    };
  },
  methods: {
    async fetchTables() {
        this.tableData = await fetchAllTables(1);
    },
    async changeStatus(table: Table) {
        await changeTableStatus(table.tableId);
        const index = this.tableData.findIndex(item => item === table);
        this.tableData[index].status = table.status === "OCCUPIED" ? "PAID" : "AVAILABLE";
    }
  },
};
</script>
