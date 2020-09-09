import { ICategoryItemResponse } from './category.response';
import { IPriceClientCategory } from '../utils';

export interface IProductResponse {
  data: {
    productos: Array<IProductItemResponse>;
  };
}

export interface IProductItemResponse {
 id: string;
 descripcion: string;
 codigo: number;
 precio: number;
 iva: number;
 stock: number;
 precios: Array<IPriceClientCategory>;
}
