import { ICheckItemResponse } from './responses/check.response';
import { IClientItemResponse } from './responses/client.response';
export interface ILocation {
    id: string;
    descripcion: string;
    codigoPostal: number;
  }
export interface IProfileAFIP {
    id: string;
    descripcion: string;
  }
export interface IClientCategory {
    id: string;
    descripcion: string;
  }
export interface IClientResponse {
    data: {
        categoriasClientes: Array<IClientCategory>;
    };
}
export interface IPriceClientCategory {
  id: string;
  categoriaCliente: IClientCategory;
  precio: number;
}
export interface IIva {
  id: string;
  iva: number;
}

export interface ILocationUpdate {
  descripcion: string;
  codigoPostal: string;
}

export interface IBank {
  id: string;
  descripcion: string;
}

export interface ITypeOfPaymentMethods{
  id: string;
  descripcion: string;
  referencia: string;
}

export interface IBankTransfer{
    id: string;
    CBU: string;
    alias: string;
    titularCuenta: string;
    banco: IBank;
    importe: number;
    realizada: boolean;
    recibida: boolean;
}

export interface IPayment {
   id: string;
   tipoDePago: ITypeOfPaymentMethods;
   cheque: ICheckItemResponse;
   transferencia: IBankTransfer;
   importe: number;
}