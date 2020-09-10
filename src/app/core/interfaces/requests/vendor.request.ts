import { ILocation, IProfileAFIP } from '../utils';

export interface IVendorRequest {
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
