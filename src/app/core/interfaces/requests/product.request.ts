import { IPriceClientCategory } from '../utils';

export interface IProductRequest {
  id: string;
  descripcion: string;
  codigo: number;
  precio: number;
  cantidad: number;
  iva: number;
  stock: number;
  precios: Array<IPriceClientCategory>;
}
