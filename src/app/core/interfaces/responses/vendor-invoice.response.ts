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
    fecha: Date;
    proveedor: IVendorItemResponse;
    productos: IProductItemResponse[];
    ivaDesglose: boolean;
    nro: number;
    subTotal: number;
    totalIva: number;
    totalIva21: number;
    totalIva10: number;
    total: number;
  }
