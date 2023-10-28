import { ref } from 'vue';
import { CartItem } from '@/types/cart';

export const cartData = ref<CartItem[]>([]);