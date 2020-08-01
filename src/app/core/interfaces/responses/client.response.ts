
export interface IClientResponse {
  data: {
    clientes: Array<IClientItemResponse>;
  };
}

export interface IClientItemResponse {
 codigo: number;
 razonSocial: string;
 apellido: string;
 nombre: string;
 domicilio: string;
 nro: number;
}
