
export interface IClientResponse {
  data: {
    clientes: Array<IClientItemResponse>;
  };
}

export interface IClientItemResponse {
 id: string;
 razonSocial: string;
 apellido: string;
 nombre: string;
 domicilio: string;
 nro: number;
}
