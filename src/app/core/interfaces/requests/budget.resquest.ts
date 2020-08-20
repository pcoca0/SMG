import { IClientItemResponse } from '../responses/client.response';
import { IProductItemResponse } from '../responses/product.response';

export interface IBudgetRequest {
    id?: string;
    numero?: number;
    fecha?: Date;
    cliente?: IClientItemResponse;
    productos?: IProductItemResponse[];
    nro?: number;
    total?: number;
  }
