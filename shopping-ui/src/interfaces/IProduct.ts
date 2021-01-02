export default interface IProduct {
  length: number;
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: number | string;
  quantity: number;
}
