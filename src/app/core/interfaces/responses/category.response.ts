export interface ICategoryResponse {
  data: {
    categorias: Array<ICategoryItemResponse>;
  };
}


export interface ICategoryItemResponse {
 id: string;
 descripcion: string;
}
