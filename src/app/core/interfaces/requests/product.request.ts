import { ICategoryItemResponse } from '../responses/category.response';
import { ICategoryRequest } from './category.request';
import { IPriceClientCategory } from '../utils';

export interface IProductRequest {
  id: string;
  descripcion: string;
  precio: number;
  iva: number;
  stock: number;
  precios: Array<IPriceClientCategory>;
}
