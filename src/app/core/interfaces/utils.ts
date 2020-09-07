export interface ILocation {
    id: string;
    descripcion: string;
    codigoPostal: string;
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