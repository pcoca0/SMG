import { ICategoryItemResponse } from './category.response';
import { IIva, IPriceClientCategory } from '../utils';

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
 cantidad: number;
 iva: IIva;
 stock: number;
 precios: Array<IPriceClientCategory>;
}
