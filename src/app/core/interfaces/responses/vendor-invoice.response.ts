import { IClientItemResponse } from './client.response';
import { IProductItemResponse } from './product.response';
import { IVendorItemResponse } from './vendor.response';

export interface IVendorInvoiceResponse {
    data: {
        facturasProveedores: Array<IVendorInvoiceItemResponse>;
    };
}

export interface IVendorInvoiceItemResponse {
    id: string;
    numero: number;
    concepto: string;
    fecha: Date;
    proveedor: IVendorItemResponse;
    productos: IProductItemResponse[];
    nro: number;
    subTotal: number;
    totalIva: number;
    total: number;
    saldoAPagar?: number;
    saldoAFavor?: number;
  }
