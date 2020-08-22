import { IClientItemResponse } from './client.response';
import { IProductItemResponse } from './product.response';

export interface IBudgetResponse {
    data: {
        presupuestos: Array<IBudgetItemResponse>;
    };
}

export interface IBudgetItemResponse {
    id: string;
    numero: number;
    fecha: Date;
    cliente: IClientItemResponse;
    productos: IProductItemResponse[];
    nro: number;
    total: number;
  }
