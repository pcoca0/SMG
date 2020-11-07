import { IProductItemResponse } from '../responses/product.response';
import { IVendorItemResponse } from '../responses/vendor.response';

export interface IVendorInvoiceRequest {
    id?: string;
    numero?: number;
    fecha?: Date;
    proveedor?: IVendorItemResponse;
    productos?: IProductItemResponse[];
    nro?: number;
    subTotal?: number;
    totalIva?: number;
    total?: number;
    concepto?: string;
    saldoAPagar?: number;
    saldoAFavor?: number;
  }
