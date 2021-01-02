<template>
  <main class="home">
    <div class="flex w-screen h-screen">
      <div class="flex flex-col flex-grow relative">
        <navbar @toggleCart="toggleCart" />
        <perfect-scrollbar>
          <slot></slot>
        </perfect-scrollbar>
      </div>
      <cart
        :is-open="isCartOpened"
        @on-close="toggleCart"
      />
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import Navbar from '../common/header/Navbar.vue';
  import Cart from '../cart/Cart.vue';

  @Component({
    components: {
      Cart,
      Navbar,
    },
  })
  export default class Overview extends Vue {
    private isCartOpened = false;

    private toggleCart() {
      this.isCartOpened = !this.isCartOpened;
    }
  }
</script>

