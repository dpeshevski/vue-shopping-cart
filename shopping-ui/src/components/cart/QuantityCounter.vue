<template>
  <div
    v-if="product" 
    class="total-amount"
    >
    <button
      class="total-amount__btn--remove"
      @click="removeQuantity"
    >-</button>
    <span class="px-2">{{ product.quantity }}</span>
    <button
      class="total-amount__btn--add"
      :disabled="product.stock === 0"
      @click="addQuantity"
    >+</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import IProduct from '../../interfaces/IProduct';

  const products = namespace('products');
  const cart = namespace('cart');
  
  @Component
  export default class QuantityCounter extends Vue {
    @products.Action
    public increaseQuantity!: (id: string) => void;

    @products.Action
    public decreaseQuantity!: (id: string) => void;

    @cart.Action
    public addProduct!: (product: IProduct) => void;

    @cart.Action
    public removeProduct!: (product: IProduct) => void;

    @Prop() private product!: IProduct;

    private addQuantity() {
      this.addProduct(this.product);
      this.decreaseQuantity(this.product.id);
    }

    private removeQuantity() {
      this.removeProduct(this.product);
      this.increaseQuantity(this.product.id);
    }
  }
</script>

<style lang="postcss">
  .total-amount {
    @apply flex justify-between border w-24 rounded-sm;
  }

  .total-amount__btn--add,
  .total-amount__btn--remove {
    @apply flex items-center justify-center bg-white font-semibold w-8 h-6 ease-in-out duration-150;
  }

  .total-amount__btn--add:hover {
    @apply bg-green-500 text-white;
  }
  .total-amount__btn--remove:hover {
    @apply bg-red-500 text-white;
  }

  .total-amount__btn--add:disabled,
  .total-amount__btn--remove:disabled {
    @apply bg-gray-100 text-gray-300 cursor-not-allowed;
  }

  .total-amount__btn--add:focus,
  .total-amount__btn--remove:focus {
    @apply outline-none;
  }
</style>