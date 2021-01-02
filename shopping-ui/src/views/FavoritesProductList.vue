<template>
  <overview>
    <div class="flex flex-wrap overflow-auto px-4">
      <product
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
  </overview>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  import Product from '../components/product/Product.vue';
  import Overview from '../components/templates/Overview.vue';

  import IProduct from '../interfaces/IProduct';

  const products = namespace('products');

  @Component({
    components: {
      Product,
      Overview,
    },
  })
  export default class FavoritesProductList extends Vue {
    @products.Getter
    public allProducts!: IProduct[];

    @products.Action
    public loadFavoriteProducts!: () => void;

    private products: IProduct[] = [];

    private async mounted() {
      await this.loadFavoriteProducts();
      this.products = this.allProducts;
    }
  }
</script>