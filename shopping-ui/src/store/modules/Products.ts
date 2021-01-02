import {
  Action,
  Mutation,
  Module,
  VuexModule,
  config,
} from 'vuex-module-decorators';

import ProductService from '../../services/product';

import IProduct from '../../interfaces/IProduct';
import IServerResponse from '../../interfaces/IServerResponse';

import updater from '../../utils/updater';

config.rawError = true;

@Module({ namespaced: true })
class ProductsModule extends VuexModule {
  public products: IProduct[] = [];
  public product?: IProduct | null = null;
  public stockLeft?: number = this.product?.stock;

  get allProducts(): IProduct[] {
    return this.products;
  }

  @Mutation
  public setProducts(value: IProduct[]): void {
    this.products = value;
  }

  @Mutation
  public setProduct(value: IProduct): void {
    this.product = value;
  }

  @Action
  public async loadProducts(): Promise<void> {
    await ProductService.fetchAll().then((response: IServerResponse) => {
      this.context.commit('setProducts', response.data);
    }).catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`Error ${error.message}`);
    });
  }

  @Action
  public async loadProduct(id: string): Promise<void> {
    await ProductService.fetchById(id).then((response: IServerResponse) => {
      this.context.commit('setProduct', response.data);
    }).catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`Error ${error.message}`);
    });
  }

  @Action
  public async loadFavoriteProducts(): Promise<void> {
    await ProductService.fetchByFavoritesQuery().then((response: IServerResponse) => {
      this.context.commit('setProducts', response.data);
    }).catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`Error ${error.message}`);
    });
  }

  @Action
  public async markAsFavoriteProduct(product: IProduct): Promise<void> {
    product.favorite = product.favorite === 0 ? '1' : 0;
    await ProductService.update(product.id, product).catch((error: Error) => {
      // tslint:disable-next-line:no-console
      console.error(`Error ${error.message}`);
    });
  }

  @Action
  public increaseQuantity(id: string): void {
    const options = {
      items: this.products,
      id,
      itemToUpdate: 'stock',
      stateToUpdate: this.stockLeft,
      type: 'increment',
    };

    updater(options);
  }

  @Action
  public decreaseQuantity(id: string): void {
    const options = {
      items: this.products,
      id,
      itemToUpdate: 'stock',
      stateToUpdate: this.stockLeft,
      type: 'decrement',
    };

    updater(options);
  }
}

export default ProductsModule;
