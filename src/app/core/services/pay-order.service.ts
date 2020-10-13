import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPayOrderRequest } from '../interfaces/requests/pay-order.request';
import { IPayOrderResponse } from '../interfaces/responses/pay-order.response';

@Injectable({
  providedIn: 'root'
})
export class PayOrderService {

  apiUrl = environment.apis.productApi.url; 
  budgetPath = 'api/ordenesDePago';

  constructor(private http: HttpClient) { }

  getPayOrders(): Observable<IPayOrderResponse> {
    return this.http.get(this.apiUrl + this.budgetPath) as Observable<IPayOrderResponse>;
  }

  getPayOrder(id: string): Observable<IPayOrderResponse> {
    return this.http.get(this.apiUrl + `api/ordenDePago/${id}`) as Observable<IPayOrderResponse>;
  }

  addPayOrder(ordenDePago: IPayOrderRequest): Observable<IPayOrderResponse> {
    return this.http.post(this.apiUrl + `api/ordenDePago/add`, ordenDePago) as Observable<IPayOrderResponse>;
  }
  putPayOrder(id: string, ordenDePago: IPayOrderRequest): Observable<IPayOrderResponse> {
    return this.http.put(this.apiUrl + `api/ordenDePago/${id}/update`, ordenDePago) as Observable<IPayOrderResponse>;
  }
  deletePayOrder(id: string): Observable<IPayOrderResponse> {
    return this.http.delete(this.apiUrl + `api/ordenDePago/${id}/delete`) as Observable<IPayOrderResponse>;
  }

  getPayOrdersByVendor(idProveedor: string): Observable<IPayOrderResponse> {
    return this.http.get(this.apiUrl + `api/ordenesDePagoProveedor/${idProveedor}`) as Observable<IPayOrderResponse>;
  }
}
