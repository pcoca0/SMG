export interface ICategoryResponse {
  data: {
    categorias: Array<ICategoryItemResponse>;
  };
}


export interface ICategoryItemResponse {
 codigo: number;
 descripcion: string;
}
