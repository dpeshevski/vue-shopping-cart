<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="right-0 mx-12 absolute lg:hidden">
        <icon
          icon="shopping-cart"
          :notice="productsInCart.length"
          :noticeNumber="countProductsInCart"
          @click="$emit('toggleCart')"
        />
      </div>
      <h1 class="text-3xl">Product List</h1>
      <div id="navbar-content__menu">
        <a class="rounded-l-lg m-2" @click="goTo('home')">Home</a>
        <a class="rounded-r-lg" @click="goTo('favorites')">Favorites</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';
  
  import Icon from '../buttons/Icon.vue';
  
  import IProduct from '../../../interfaces/IProduct';

  const cart = namespace('cart');
  const products = namespace('products');

  @Component({
    components: {
      Icon,
    },
  })
  export default class Navbar extends Vue {
    @cart.State
    public productsInCart!: IProduct[];

    @cart.Getter
    public getQuantity?: number;

    @products.State
    public product!: IProduct;


    get countProductsInCart() {
      return this.productsInCart.length
        ? this.productsInCart.map((item) => item.quantity).reduce(this.sum)
        : null;
    }

    private sum(prev: number, next: number): number {
      return prev + next;
    }

    private goTo(direction: string) {
      if (direction === 'home') {
        this.$router.push('/');
      } else {
        this.$router.push({ name: 'Favorites' });
      }
    }
  }
</script>

<style lang="postcss">
  .navbar {
    @apply w-full bg-white py-4;
  }

  .navbar-content {
    @apply flex flex-col justify-center text-center relative
  }

  #navbar-content__menu a {
    @apply text-white bg-green-400 bg-opacity-50;
  }
</style>