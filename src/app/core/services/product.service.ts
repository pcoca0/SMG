import { Injectable } from '@angular/core';
import { IProductService } from '../interfaces/services/product.service';
import { Observable } from 'rxjs';
import { ICategoryResponse, ICategoryItemResponse } from '../interfaces/responses/category.response';
import { IProductResponse, IProductItemResponse } from '../interfaces/responses/product.response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICategoryRequest } from '../interfaces/requests/category.request';
import { IProductRequest } from '../interfaces/requests/product.request';


@Injectable()
export class ProductService implements IProductService {

  apiUrl = environment.apis.productApi.url;
  categoriesPath = 'api/categorias';
  productsPath = 'api/productos';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategoryResponse> {
    return this.http.get(this.apiUrl + this.categoriesPath) as Observable<ICategoryResponse>;
  }

  addCategory(categoria: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post(this.apiUrl + `api/categoria/add`, categoria) as Observable<ICategoryResponse>;
  }
  putCategory(id: string, categoria: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.put(this.apiUrl + `api/categoria/${id}/update`, categoria) as Observable<ICategoryResponse>;
  }
  deleteCategory(id: string): Observable<ICategoryResponse> {
    return this.http.delete(this.apiUrl + `api/categoria/${id}/delete`) as Observable<ICategoryResponse>;
  }

  getProducts(): Observable<IProductResponse> {
    return this.http.get(this.apiUrl + this.productsPath) as Observable<IProductResponse>;
  }

  addProduct(producto: IProductRequest): Observable<IProductResponse> {
    return this.http.post(this.apiUrl + `api/producto/add`, producto) as Observable<IProductResponse>;
  }
  putProduct(id: string, producto: IProductRequest): Observable<IProductResponse> {
    return this.http.put(this.apiUrl + `api/producto/${id}/update`, producto) as Observable<IProductResponse>;
  }
  deleteProduct(id: string): Observable<IProductResponse> {
    return this.http.delete(this.apiUrl + `api/producto/${id}/delete`) as Observable<IProductResponse>;
  }


}
