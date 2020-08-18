import { ICategoryItemResponse } from '../responses/category.response';
import { ICategoryRequest } from './category.request';

export interface IProductRequest {
  id: string;
  descripcion: string;
  precio: number;
  categoria: ICategoryRequest;
}
