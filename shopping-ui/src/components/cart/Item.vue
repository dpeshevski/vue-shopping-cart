<template>
  <div
    v-if="productData"
    class="flex p-4"
  >
    <figure class="w-32">
      <img
        :src="productData.image_url"
        :alt="productData.productName"
      >
    </figure>

    <div class="flex flex-col w-full pl-4">
      <div>
        <span class="font-semibold">
          {{ productData.productName }}
        </span>
      </div>
      <div class="self-end my-2">
        <span class="font-semibold text-blue-400">
          {{ productData.price }}{{ currencySymbol }}
      </span>
      </div>
      <div class="flex items-center">
        <quantity-counter :product="productData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  
  import IProduct from '../../interfaces/IProduct';
  import { CURRENCY_SYMBOL } from '../../globals';

  import QuantityCounter from './QuantityCounter.vue';

  @Component({
    components: {
      QuantityCounter,
    },
  })
  export default class Cart extends Vue {
    private currencySymbol = CURRENCY_SYMBOL;

    @Prop() private productData!: IProduct;
  }
</script>