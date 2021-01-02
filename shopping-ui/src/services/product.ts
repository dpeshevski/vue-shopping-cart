import axios from './axios/index';

import IProduct from '../interfaces/IProduct';

class Product {
  public fetchAll() {
    return axios.get('/grocery');
  }

  public fetchById(id: string) {
    return axios.get(`/grocery/${id}`);
  }

  public fetchByFavoritesQuery() {
    return axios.get(`/grocery?favorite=1`);
  }

  public update(id: string, payload: IProduct) {
    return axios.patch(`/grocery/${id}`, payload);
  }
}

export default new Product();
