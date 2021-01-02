<template>
  <div 
    v-if="product"
    :class="{
      'w-full': isFull,
      'flex flex-col px-2 py-4 w-2/4 md:px-10 xl:w-1/4 lg:w-1/3 lg:p-4': !isFull
    }" 
  >
    <div 
    :class="['flex flex-col bg-white rounded overflow-hidden',
      {'lg:flex-row p-4': isFull, 'h-full': !isFull }]"
      >
      <figure :class="['self-center relative', { 'lg:w-1/3': isFull }]">
        <div
          :class="['absolute right-0 top-0 cursor-pointer', { 'mr-2 mt-2': !isFull, 'mr-8 mt-4': isFull }]"
          @click="markFavorite"
          >
          <font-awesome-icon
            icon="heart"
            :class="['text-xl', { 'text-red-600': product.favorite, 'text-white': !product.favorite }]"
          />
        </div>
        <a @click="goTo"> 
          <img :src="product.image_url" :alt="product.productName">
        </a>
      </figure>
      <div :class="['flex flex-col p-2', { 'lg:w-2/3 lg:h-auto': isFull, 'h-full': !isFull }]">
        <div class="flex flex-col justify-between items-center font-bold md:flex-row">
          <a @click="goTo">
            <span :class="{ 'text-3xl': isFull, 'md:text-lg': !isFull }">
              {{ product.productName }}
            </span>
          </a>
          <span :class="['text-blue-300 flex-shrink-0 self-end md:self-auto', { 'text-2xl': isFull }]">
            {{ product.price }}{{ currencySymbol }}
          </span>
        </div>
        <div class="flex-grow mt-4">
          <p v-if="isFull" class="text-left">
            {{ product.productDescription }}
          </p>
          <p class="text-left" v-else>
            {{ excerpt }}
          </p>
        </div>
        <div class="flex justify-between items-center mt-4">
          <span>{{ stockLeftInfo }}</span>
          <btn-add
            @click="addProductToCart"
            :name="'+ add'"
            :disabled="!isAvailableToBuy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import IProduct from '../../interfaces/IProduct';
  import Button from '../common/buttons/Button.vue';

  import { CURRENCY_SYMBOL } from '../../globals';

  const cart = namespace('cart');
  const products = namespace('products');

  @Component({
    components: {
      'btn-add': Button,
    },
  })
  export default class Product extends Vue {
    @Prop() public product!: IProduct;

    @cart.Action
    public addProduct!: (product: IProduct) => void;

    @products.Action
    public markAsFavoriteProduct!: (product: IProduct) => void;

    @products.Action
    public decreaseQuantity!: (id: string) => void;

    private currencySymbol = CURRENCY_SYMBOL;

    @Prop({ default: false }) private isFull!: boolean;

    private addProductToCart() {
      this.decreaseQuantity(this.product.id);
      this.addProduct(this.product);
    }

    private markFavorite() {
      this.markAsFavoriteProduct(this.product);
    }

    private goTo() {
      this.$router.push({
        name: 'ProductDetails',
        params: {
          id: this.product.id,
        },
      });
    }

    get stockLeftInfo() {
      return this.product.stock
        ? `${this.product.stock} left`
        : 'No stock';
    }

    get excerpt() {
      return `${this.product.productDescription.split(/\s+/).slice(0, 5).join(' ')} ...`;
    }

    get isAvailableToBuy() {
      return this.product.stock > 0;
    }
  }
</script>
