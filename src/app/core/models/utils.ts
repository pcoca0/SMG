import { IClientCategory } from '../interfaces/utils';

export class PriceClientCategory{
  id: string;
  categoriaCliente: ClientCategory;
  precio: number;
  constructor(id, idCategoria, descCategoria, precio){
    this.id = id,
    this.categoriaCliente = new ClientCategory(idCategoria, descCategoria),
    this.precio = precio
  }
}

export class ClientCategory{
  constructor(
    id:string,
    descripcion: string
  ){}
}
