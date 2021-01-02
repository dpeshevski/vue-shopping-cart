import Vue from 'vue';
import Vuex from 'vuex';

import CartModule from './modules/Cart';
import ProductsModule from './modules/Products';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: CartModule,
    products: ProductsModule,
  },
});
