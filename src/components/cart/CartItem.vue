<template>
  <v-responsive class="align-center text-center">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Price</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in cartData" :key="i">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            {{ item.quantity }}
          </td>
          <td>{{ item.price * item.quantity }}</td>
          <td>
            <v-icon
              icon="mdi-minus-circle"
              size="small"
              @click.stop="decrementQuantity(item)"
            ></v-icon>
            <v-icon
              icon="mdi-plus-circle"
              size="small"
              @click.stop="incrementQuantity(item)"
            ></v-icon>
            <v-icon
              icon="mdi-close-circle"
              size="small"
              @click.stop="removeItem(item)"
            ></v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-divider />
    <v-btn size="small" variant="text" class="ma-3 float-left"
      >Total sum: {{ totalSum() }}€</v-btn
    >
    <v-btn
      size="small"
      @click="finishOrder"
      variant="outlined"
      class="ma-3 float-right"
      >checkout</v-btn
    >
  </v-responsive>
</template>

<script lang="ts">
import { postOrder } from "@/services/order";
import { postOrderedItems } from "@/services/orderItems";
import { cartData } from "@/store/modules/cart";
import { CartItem } from "@/types/cart";
import { Order } from "@/types/order";

export default {
  data() {
    return {
      order: {} as Order,
    };
  },
  props: {
    selection: {
      type: String,
      required: true,
    },
  },
  methods: {
    async finishOrder() {
        await this.createOrder();
        this.attachOrderToCartItems();
        await postOrderedItems(cartData.value);
        cartData.value.splice(0, cartData.value.length);
    },
    async createOrder() {
      const userId = 1;
      this.order = await postOrder(userId, { tableId: this.selection })
    },
    attachOrderToCartItems() {
      cartData.value.forEach((item) => (item.orderId = this.order.orderId));
    },
    incrementQuantity(cartItem: CartItem) {
      cartItem.quantity++;
    },
    decrementQuantity(cartItem: CartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    totalSum() {
      let sum: number = 0;
      cartData.value.forEach((cartItem) => {
        sum += cartItem.price * cartItem.quantity;
      });
      return sum;
    },
    removeItem(cartItemToDelete: CartItem) {
      const index = cartData.value.findIndex(
        (cartItem) => cartItem === cartItemToDelete
      );
      if (index !== -1) {
        const cartItem = cartData.value[index];
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          cartData.value.splice(index, 1);
        }
      }
    },
  },
  setup() {
    return {
      cartData,
    };
  },
  watch: {
    cartData: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true,
    },
  },
};
</script>
