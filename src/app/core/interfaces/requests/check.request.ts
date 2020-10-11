import { ILocation, IBank } from '../utils';
export interface ICheckRequest {
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
