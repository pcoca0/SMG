import { Injectable } from '@angular/core';
import { IProductService } from '../interfaces/services/product.service';
import { Observable } from 'rxjs';
import { ICategoryResponse } from '../interfaces/responses/category.response';
import { IProductResponse } from '../interfaces/responses/product.response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ProductService implements IProductService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategoryResponse> {
    throw new Error("Method not implemented.");
  }
  getProducts(): Observable<IProductResponse> {
    throw new Error("Method not implemented.");
  }
}
