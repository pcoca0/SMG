import { IPayment } from '../utils';
import { IVendorInvoiceItemResponse, IVendorInvoiceResponse } from './vendor-invoice.response';

export interface IPayOrderResponse {
    data: {
        ordenesDePago: Array<IPayOrderItemResponse>;
    };
}

export interface IPayOrderItemResponse {
    id: string;
    fechaPago: Date;
    numero: number;
    facturaProveedor: IVendorInvoiceItemResponse;
    pagos: Array<IPayment>;
    totalPago: number;
    saldoAdeudado: number;
    saldoAFavor: number;
  }
