import { IClientItemResponse } from './client.response';
import { IProductItemResponse } from './product.response';

export interface IInvoiceResponse {
    data: {
        facturas: Array<IInvoiceItemResponse>;
    };
}

export interface IInvoiceItemResponse {
    id: string;
    numero: number;
    fecha: Date;
    cliente: IClientItemResponse;
    productos: IProductItemResponse[];
    nro: number;
    subTotal: number;
    iva: number;
    total: number;
  }
