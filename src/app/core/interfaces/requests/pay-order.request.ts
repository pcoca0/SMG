import { IPayment } from '../utils';
import { IVendorInvoiceRequest } from './vendor-invoice.request';

export interface IPayOrderRequest {
    id: string;
    fechaPago: Date;
    numero: number;
    facturaProveedor: IVendorInvoiceRequest;
    pagos: Array<IPayment>;
    totalPago: number;
    saldoAdeudado: number;
    saldoAFavor: number;
  }
