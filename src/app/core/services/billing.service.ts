import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBillRequest } from '../interfaces/requests/bill.request';
import { IBillResponse } from '../interfaces/responses/bill.response';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  apiUrl = environment.apis.productApi.url; 
  budgetPath = 'api/cobros';

  constructor(private http: HttpClient) { }

  getBills(): Observable<IBillResponse> {
    return this.http.get(this.apiUrl + this.budgetPath) as Observable<IBillResponse>;
  }

  getBill(id: string): Observable<IBillResponse> {
    return this.http.get(this.apiUrl + `api/cobro/${id}`) as Observable<IBillResponse>;
  }

  addBill(cobro: IBillRequest): Observable<IBillResponse> {
    return this.http.post(this.apiUrl + `api/cobro/add`, cobro) as Observable<IBillResponse>;
  }
  putBill(id: string, cobro: IBillRequest): Observable<IBillResponse> {
    return this.http.put(this.apiUrl + `api/cobro/${id}/update`, cobro) as Observable<IBillResponse>;
  }
  deleteBill(id: string): Observable<IBillResponse> {
    return this.http.delete(this.apiUrl + `api/cobro/${id}/delete`) as Observable<IBillResponse>;
  }

  getBillsByClient(idCliente: string): Observable<IBillResponse> {
    return this.http.get(this.apiUrl + `api/cobrosCliente/${idCliente}`) as Observable<IBillResponse>;
  }
}
