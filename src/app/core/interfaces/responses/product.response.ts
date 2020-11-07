import { ICategoryItemResponse } from './category.response';
import { IIva, IPriceClientCategory } from '../utils';
import { IVendorItemResponse } from './vendor.response';
import { ITrackInfoItemResponse } from './track.response';

export interface IProductResponse {
  data: {
    productos: Array<IProductItemResponse>;
  };
}

export interface IProductItemResponse {
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
 proveedor: IVendorItemResponse;
 comentario: string;
 seguimiento: boolean;
 trackIncomplete?: boolean;
 seguimientoInfo?: Array<ITrackInfoItemResponse>;
 codigosSeguimiento?: Array<string>;

}
