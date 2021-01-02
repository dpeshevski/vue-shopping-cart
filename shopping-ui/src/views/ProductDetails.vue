<template>
  <overview>
    <div class="mx-8 my-10">
      <product
        :isFull="true"
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
  export default class ProductDetails extends Vue {
    @products.Action
    public loadProduct!: (id: string) => void;

    @products.State
    private product!: IProduct;

    private async mounted() {
      await this.loadProduct(this.$route.params.id);
    }
  }
</script>
