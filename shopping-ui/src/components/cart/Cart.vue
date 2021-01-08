<template>
  <div :class="['flex flex-col flex-shrink-0 bg-white border-l border-gray-500 h-screen absolute overflow-hidden ease-in-out duration-200 lg:flex lg:p-4 lg:w-1/4 lg:relative lg:opacity-100 shadow-xl',
    {
      'opacity-1 w-screen p-4': this.isOpen,
      'opacity-0 hidden p-0': !this.isOpen
    }]">
    <div class="cart-header">
      <div
        class="flex justify-center items-center left-0 cursor-pointer ml-4 absolute lg:hidden"
        @click="onClose"
        >
        <font-awesome-icon icon="angle-left" class="text-2xl" />
      </div>
      <span class="text-3xl">Cart</span>
    </div>

    <div class="cart-section">
      <perfect-scrollbar v-if="productsInCart.length" class="cart-section__items">
        <item
          v-for="(product, index) in productsInCart"
          :key="index"
          :product-data="product"
        />
      </perfect-scrollbar>
      <div v-else :class="['cart-section__items', 'cart-section__items--empty']">
        <span class="text-xl text-gray-500 font-bold">
          Your cart is currently empty!
        </span>
      </div>
    </div>

    <div v-if="productsInCart.length" class="flex flex-col justify-between xl:flex-row-reverse sm:items-center">
      <div class="text-xl text-right font-semibold self-end w-full py-4 mb-8 border-gray-200 border-b lg:border-b-0 lg:mb-0">
        <span class="mr-8">Total Amount: </span>
        <span class="text-yellow-400">
          {{ currencySymbol }}{{ totalAmount }}
        </span>
      </div>
      <div class="mr-4">
        <btn-checkout
          class="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 rounded"
          name="Checkout"
          size="xl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Emit,
    Prop,
  } from 'vue-property-decorator';

  import { namespace } from 'vuex-class';

  import IProduct from '../../interfaces/IProduct';

  import Button from '../common/buttons/Button.vue';
  import Item from './Item.vue';

  import { CURRENCY_SYMBOL } from '../../globals';

  const cart = namespace('cart');

  @Component({
    components: {
      'btn-checkout': Button,
      Item,
    },
  })
  export default class Cart extends Vue {
    @cart.State
    public productsInCart!: IProduct[];

    @cart.State
    public quantity!: number;

    @cart.Getter
    public getQuantity!: number;

    private currencySymbol = CURRENCY_SYMBOL;

    @Prop({ default: false }) private isOpen!: boolean;

    @Emit()
    private onClose() {
      this.isOpen = this.isOpen;
    }

    private amount(product: IProduct): number {
      if (product) {
        const { price } = product;
        return price * product.quantity;
      }
      return 0;
    }

    private sum(prev: number, next: number): number {
      return prev + next;
    }

    get totalAmount() {
      return this.productsInCart.length
        ? this.productsInCart.map(this.amount).reduce(this.sum)
        : 0;
    }
  }
</script>

<style lang="postcss">
  .cart-header {
    @apply flex items-center justify-center text-center w-full relative;
  }

  .cart-section {
    @apply flex-grow overflow-y-auto relative;
  }

  .cart-section__items {
    @apply flex flex-col h-full;
  }

  .cart-section__items--empty {
    @apply justify-center text-center;
  }
</style>