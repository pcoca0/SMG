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

export interface IBank{
  id: string;
  descripcion: string;
}