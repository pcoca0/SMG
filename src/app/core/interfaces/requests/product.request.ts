import { IPriceClientCategory, IIva } from '../utils';

export interface IProductRequest {
  id: string;
  descripcion: string;
  codigo: number;
  precio: number;
  cantidad: number;
  iva: IIva;
  stock: number;
  precios: Array<IPriceClientCategory>;
}
