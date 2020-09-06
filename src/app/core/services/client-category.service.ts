import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClientCategory, IClientResponse } from '../interfaces/utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCategoryService {

  apiUrl = environment.apis.productApi.url;
  clientCategoriesPath = 'api/categoriasCliente';

  constructor(private http: HttpClient) { }

  getClientCategories(): Observable<IClientResponse> {
    return this.http.get(this.apiUrl + this.clientCategoriesPath) as Observable<IClientResponse>;
  }

  // addCategory(categoria: ICategoryRequest): Observable<ICategoryResponse> {
  //   return this.http.post(this.apiUrl + `api/categoria/add`, categoria) as Observable<ICategoryResponse>;
  // }
  // putCategory(id: string, categoria: ICategoryRequest): Observable<ICategoryResponse> {
  //   return this.http.put(this.apiUrl + `api/categoria/${id}/update`, categoria) as Observable<ICategoryResponse>;
  // }
  // deleteCategory(id: string): Observable<ICategoryResponse> {
  //   return this.http.delete(this.apiUrl + `api/categoria/${id}/delete`) as Observable<ICategoryResponse>;
  // }
}
