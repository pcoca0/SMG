import { IPayment } from '../utils';
import { IInvoiceRequest } from './invoice.request';

export interface IBillRequest {
    id: string;
    fechaCobro: Date;
    numero: number;
    factura: IInvoiceRequest;
    pagosRecibidos: Array<IPayment>;
    totalCobro: number;
    saldoAFavorCliente: number;
  }