import { Injectable } from '@angular/core';
import { IClientService } from '../interfaces/services/client.service';
import { Observable } from 'rxjs';
import { IClientResponse } from '../interfaces/responses/client.response';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBudgetResponse } from '../interfaces/responses/budget.response';
import { IBudgetRequest } from '../interfaces/requests/budget.resquest';

@Injectable({
  providedIn: 'root'
})
export class BudgetService{

  apiUrl = environment.apis.productApi.url; 
  budgetPath = 'api/presupuestos';

  constructor(private http: HttpClient) { }

  getBudgets(): Observable<IBudgetResponse> {
    return this.http.get(this.apiUrl + this.budgetPath) as Observable<IBudgetResponse>;
  }

  getBudget(id: string): Observable<IBudgetResponse> {
    return this.http.get(this.apiUrl + `api/presupuesto/${id}`) as Observable<IBudgetResponse>;
  }

  addBudget(presupuesto: IBudgetRequest): Observable<IBudgetResponse> {
    return this.http.post(this.apiUrl + `api/presupuesto/add`, presupuesto) as Observable<IBudgetResponse>;
  }
  putBudget(id: string, presupuesto : IBudgetRequest): Observable<IBudgetResponse> {
    return this.http.put(this.apiUrl + `api/presupuesto/${id}/update`, presupuesto) as Observable<IBudgetResponse>;
  }
  deleteBudget(id: string): Observable<IBudgetResponse> {
    return this.http.delete(this.apiUrl + `api/presupuesto/${id}/delete`) as Observable<IBudgetResponse>;
  }
}
