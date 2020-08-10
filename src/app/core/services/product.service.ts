import { Injectable } from '@angular/core';
import { IProductService } from '../interfaces/services/product.service';
import { Observable } from 'rxjs';
import { ICategoryResponse } from '../interfaces/responses/category.response';
import { IProductResponse } from '../interfaces/responses/product.response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductService implements IProductService {

  apiUrl = environment.apis.productApi.url;
  categoriesPath = 'api/categorias';
  categoryAddPath = 'api/categoria/add';
  categoryUpdatePath = 'api/categoria/add';
  categoryDeletePath = '';

  productsPath = 'api/productos';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategoryResponse> {
    return this.http.get(this.apiUrl + this.categoriesPath) as Observable<ICategoryResponse>;
  }

  getProducts(): Observable<IProductResponse> {
    return this.http.get(this.apiUrl + this.productsPath) as Observable<IProductResponse>;
  }
}
