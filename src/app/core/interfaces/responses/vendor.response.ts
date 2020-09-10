import { IProfileAFIP, ILocation } from '../utils';

export interface IVendorResponse {
  data: {
    proveedores: Array<IVendorItemResponse>;
  };
}

export interface IVendorItemResponse {
  id: string;
  razonSocial: string;
  cuit: string;
  apellido: string;
  nombre: string;
  calle: string;
  numero: number;
  telefono: string;
  localidad: ILocation;
  perfilAFIP: IProfileAFIP;
  contacto: string;
  nota: string;
  email: string;
  rol: string;

}
