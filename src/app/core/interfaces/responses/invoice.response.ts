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
    ivaDesglose: boolean;
    nro: number;
    subTotal: number;
    totalIva: number;
    totalIva21: number;
    totalIva10: number;
    total: number;
  }
