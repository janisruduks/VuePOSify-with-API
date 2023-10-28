<template>
  <v-container>
    <AddTable />
    <TableItems>
      <template v-slot:table="{ table, i }">
        <v-btn
          variant="text"
          size="xs-small"
          class="ma-3"
          icon="mdi-delete"
          @click="deleteTable(table.tableId)"
        ></v-btn>
        <v-btn
          variant="outlined"
          size="small"
          class="ma-3"
          @click="fetchOrderItems(table.orderId)"
          >order</v-btn
        >
        <v-overlay
          class="position-absolute d-flex align-center justify-center w-100 h-100"
          v-model="overlay"
        >
          <v-card
            class="pa-3"
            :title="'Receipt: ' + table.name"
            :subtitle="'Time open: ' + table.timeOpen"
          >
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in orderedItems" :key="i">
                  <td>{{ item.item.title }}</td>
                  <td>{{ item.item.price }}$</td>
                  <td>
                    {{ item.quantity }}
                  </td>
                  <td>{{ item.item.price * item.quantity }}$</td>
                  <td></td>
                </tr>
              </tbody>
            </v-table>
            <v-card-item
              ><v-btn class="float-right ma-3" variant="outlined"
                >Total {{ total }}$</v-btn
              ></v-card-item
            >
          </v-card>
        </v-overlay>
      </template>
    </TableItems>
  </v-container>
</template>

<script lang="ts">
import AddTable from "@/components/add/AddTable.vue";
import TableItems from "@/components/table/TableItems.vue";
export default {
  data() {
    return {
      tableName: "",
      orderedItems: [],
      overlay: false,
      total: 0,
    };
  },
  methods: {
    deleteTable(tableId: number) {
      fetch(`http://localhost:8080/api/v1/orders/${tableId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    fetchOrderItems(orderId: number) {
      if (orderId === null) {
        console.log("Table doesn't have active order");
      } else {
        fetch(`http://localhost:8080/api/v1/ordered-items/${orderId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            response.json().then((res) => {
              this.orderedItems = res;
              this.total = this.orderedItems.reduce((acc, item) => {
                return acc + item.item.price * item.quantity;
              }, 0);
              this.overlay = true;
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
  components: { TableItems, AddTable },
};
</script>
