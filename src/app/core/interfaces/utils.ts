import { ICheckItemResponse } from './responses/check.response';
import { IClientItemResponse } from './responses/client.response';
import { IVendorInvoiceRequest } from './requests/vendor-invoice.request';
import { IVendorRequest } from './requests/vendor.request';
import { IProductRequest } from './requests/product.request';
import { IBillItemResponse } from './responses/bill.response';
import { IVendorInvoiceItemResponse } from './responses/vendor-invoice.response';
import { IVendorItemResponse } from './responses/vendor.response';
import { IPayOrderItemResponse } from './responses/pay-order.response';
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


export interface ITrackInfo {
id: string;
codigo: string;
vendido: boolean;
facturaCompra: IVendorInvoiceRequest;
facturaVenta: IVendorRequest;
producto: IProductRequest;
}


export interface IClientItemMovement {
  factura: IVendorItemResponse;
  pago: IBillItemResponse;
  }

export interface IClientMovementResponse {
  data: {
      movimientos: Array<IClientItemMovement>;
  };
}


export interface IVendorItemMovement {
  factura: IVendorInvoiceItemResponse;
  pago: IPayOrderItemResponse;
  }

export interface IVendorMovementResponse {
  data: {
      movimientos: Array<IVendorItemMovement>;
  };
}




