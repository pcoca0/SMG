import { ICategoryItemResponse } from './category.response';

export interface IProductResponse {
  data: {
    productos: Array<IProductItemResponse>;
  };
}

export interface IProductItemResponse {
 id: string;
 descripcion: string;
 precio: number;
 categoria: ICategoryItemResponse;
}
