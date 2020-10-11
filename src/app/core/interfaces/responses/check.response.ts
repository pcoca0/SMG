import { IBank, ILocation } from '../utils';

 export interface ICheckResponse {
    data: {
      cheques: Array<ICheckItemResponse >;
    };
  }

  export interface ICheckItemResponse {
      id: string;
      banco: IBank;
      fechaEmision: Date;
      fechaPago: Date;
      fechaCarga: Date;
      localidad: ILocation;
      nroCheque: number;
      importe: number;
      echeque: boolean;
      comentario: string;
  }