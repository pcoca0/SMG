import { IProductItemResponse } from './product.response';
import { IVendorInvoiceItemResponse } from './vendor-invoice.response';
import { IVendorItemResponse } from './vendor.response';

export interface ITrackInfoResponse {
    data: {
      seguimientos: Array<ITrackInfoItemResponse>;
    };
  }


export interface ITrackInfoItemResponse {
    id: string;
    codigo: string;
    vendido: boolean;
    facturaCompra: IVendorInvoiceItemResponse;
    facturaVenta: IVendorItemResponse;
    producto: IProductItemResponse;
 }