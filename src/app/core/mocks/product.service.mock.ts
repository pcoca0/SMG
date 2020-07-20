import { IProductService } from '../interfaces/services/product.service';
import { Observable } from 'rxjs';
import { ICategoryResponse } from '../interfaces/responses/category.response';
import { IProductResponse } from '../interfaces/responses/product.response';
import { HttpClient } from '@angular/common/http';

export class ProductServiceMock implements IProductService {

  categoriesUrl = 'assets/mocks/Categories.json';
  productsUrl = 'assets/mocks/Products.json';
  private catalogCategories: Observable<ICategoryResponse>;
  private catalogProducts: Observable<IProductResponse>;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategoryResponse> {
    return this.catalogCategories = this.http.get(this.categoriesUrl) as Observable<ICategoryResponse>;
  }
  getProducts(): Observable<IProductResponse> {
    return this.catalogProducts = this.http.get(this.productsUrl) as Observable<IProductResponse>;
  }
}
