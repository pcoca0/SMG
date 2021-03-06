import { IClientItemResponse } from '../responses/client.response';
import { IProductItemResponse } from '../responses/product.response';
import { ITrackInfoItemResponse } from '../responses/track.response';

export interface IInvoiceRequest {
    id?: string;
    numero?: number;
    fecha?: Date;
    cliente?: IClientItemResponse;
    productos?: IProductItemResponse[];
    nro?: number;
    ivaDesglose: boolean;
    subTotal?: number;
    totalIva?: number;
    totalIva21?: number;
    totalIva10?: number;
    total?: number;
    comentario?: string;
    seguimientoInfo?: ITrackInfoItemResponse[];
    saldoACobrar?: number;
    saldoAFavorDelCliente?: number;

  }
