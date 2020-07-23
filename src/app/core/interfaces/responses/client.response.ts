
export interface IClientResponse {
  data: {
    clientes: Array<IClientItemResponse>;
  };
}

export interface IClientItemResponse {
 codigo: number;
 rezonSocial: string;
 apellido: string;
 nombre: string;
 direccion: string;
 nro: number;
}
