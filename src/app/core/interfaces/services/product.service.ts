import { Observable } from 'rxjs';
import { ICategoryResponse } from '../responses/category.response';
import { IProductResponse } from '../responses/product.response';

export interface IProductService {
  getCategories(): Observable<ICategoryResponse>;
  getProducts(): Observable<IProductResponse>;
  // saveDraft(request: ISaveDraftRequest): Observable<any>;

}
