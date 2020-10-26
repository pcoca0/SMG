import { IProductRequest } from './product.request';
import { IVendorInvoiceRequest } from './vendor-invoice.request';
import { IVendorRequest } from './vendor.request';

export interface ITrackInfoRequest {
    id: string;
    codigo: string;
    vendido: boolean;
    facturaCompra: IVendorInvoiceRequest;
    facturaVenta: IVendorRequest;
    producto: IProductRequest;
}