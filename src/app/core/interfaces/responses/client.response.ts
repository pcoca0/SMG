import { IClientCategory, IProfileAFIP, ILocation } from '../utils';

export interface IClientResponse {
  data: {
    clientes: Array<IClientItemResponse>;
  };
}

export interface IClientItemResponse {
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
