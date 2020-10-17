import { IPayment } from '../utils';
import { IInvoiceItemResponse } from './invoice.response';
import { IVendorInvoiceItemResponse, IVendorInvoiceResponse } from './vendor-invoice.response';

export interface IBillResponse {
    data: {
        cobros: Array<IBillItemResponse>;
    };
}

export interface IBillItemResponse {
    id: string;
    fechaCobro: Date;
    numero: number;
    factura: IInvoiceItemResponse;
    pagosRecibidos: Array<IPayment>;
    totalCobro: number;
    saldoAFavorCliente: number;
  }
