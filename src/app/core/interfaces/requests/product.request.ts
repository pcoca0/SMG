import { IPriceClientCategory, IIva, ITrackInfo } from '../utils';
import { IVendorRequest } from './vendor.request';

export interface IProductRequest {
  id: string;
  descripcion: string;
  codigo: number;
  precio: number;
  precioCompra: number;
  ivaCompra: number;
  cantidad: number;
  iva: IIva;
  stock: number;
  precios: Array<IPriceClientCategory>;
  proveedor: IVendorRequest;
  comentario: string;
  seguimiento: boolean;
  seguimientoInfo?: Array<ITrackInfo>;
  codigosSeguimiento?: Array<string>;
}
