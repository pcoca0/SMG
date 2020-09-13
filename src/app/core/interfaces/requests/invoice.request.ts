import { IClientItemResponse } from '../responses/client.response';
import { IProductItemResponse } from '../responses/product.response';

export interface IInvoiceRequest {
    id?: string;
    numero?: number;
    fecha?: Date;
    cliente?: IClientItemResponse;
    productos?: IProductItemResponse[];
    nro?: number;
    subTotal?: number;
    iva?: number;
    total?: number;
  }
