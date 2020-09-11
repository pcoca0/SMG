import { IProfileAFIP, ILocation, IClientCategory } from '../utils';

export interface IClientRequest {
  id: string;
  razonSocial: string;
  cuil: string;
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
  categoriaCliente: IClientCategory;

}



