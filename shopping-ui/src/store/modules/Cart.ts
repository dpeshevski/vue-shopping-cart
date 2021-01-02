import Vue from 'vue';
import {
  Action,
  Mutation,
  Module,
  VuexModule,
  config,
} from 'vuex-module-decorators';

import IProduct from '../../interfaces/IProduct';

config.rawError = true;

@Module({ namespaced: true })
class CartModule extends VuexModule {
  public productsInCart: IProduct[] = [];
  public quantity = 0;

  get allProductsInCart(): IProduct[] {
    return this.productsInCart;
  }

  get getQuantity() {
    return this.quantity;
  }

  @Mutation
  public addProductToCart(product: IProduct): void {
    const productIndex = this.productsInCart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      this.quantity = 1;
      product.quantity = this.quantity;
      this.productsInCart.push(product);
      return;
    }

    const productItemToUpdate = this.productsInCart[productIndex];
    if (productItemToUpdate && product.quantity) {
      product.quantity += 1;
      Vue.set(this.productsInCart, productIndex, productItemToUpdate);
    }
  }

  @Mutation
  public removeProductFromCart(product: IProduct): void {
    const productIndex = this.productsInCart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      return;
    }

    const productItemToUpdate = this.productsInCart[productIndex];

    if (productItemToUpdate && product.quantity) {
      if (product.quantity === 1) {
        product.quantity -= 1;
        Vue.delete(this.productsInCart, productIndex);
        return;
      }
      product.quantity -= 1;
      Vue.set(this.productsInCart, productIndex, productItemToUpdate);
    }
  }

  @Action
  public addProduct(product: IProduct): void {
    this.context.commit('addProductToCart', product);
  }

  @Action
  public removeProduct(product: IProduct): void {
    this.context.commit('removeProductFromCart', product);
  }
}

export default CartModule;
