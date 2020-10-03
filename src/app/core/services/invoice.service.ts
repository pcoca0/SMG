import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IInvoiceResponse } from '../interfaces/responses/invoice.response';
import { Observable } from 'rxjs';
import { IInvoiceRequest } from '../interfaces/requests/invoice.request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl = environment.apis.productApi.url; 
  budgetPath = 'api/facturas';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<IInvoiceResponse> {
    return this.http.get(this.apiUrl + this.budgetPath) as Observable<IInvoiceResponse>;
  }

  getInvoice(id: string): Observable<IInvoiceResponse> {
    return this.http.get(this.apiUrl + `api/factura/${id}`) as Observable<IInvoiceResponse>;
  }

  addInvoice(factura: IInvoiceRequest): Observable<IInvoiceResponse> {
    return this.http.post(this.apiUrl + `api/factura/add`, factura) as Observable<IInvoiceResponse>;
  }
  putInvoice(id: string, factura : IInvoiceRequest): Observable<IInvoiceResponse> {
    return this.http.put(this.apiUrl + `api/factura/${id}/update`, factura) as Observable<IInvoiceResponse>;
  }
  deleteInvoice(id: string): Observable<IInvoiceResponse> {
    return this.http.delete(this.apiUrl + `api/factura/${id}/delete`) as Observable<IInvoiceResponse>;
  }

  getInvoicePdf(id: string): Observable<string> {
    const httpOptions = {'responseType'  : 'arraybuffer' as 'json'};
    return this.http.get(this.apiUrl + `api/factura/pdf/${id}`, httpOptions) as Observable<string>;
  }

  getReferPdf(factura: IInvoiceRequest): Observable<string> {
    const httpOptions = {'responseType'  : 'arraybuffer' as 'json'};
    return this.http.post(this.apiUrl + `api/remito/pdf/`, factura, httpOptions ) as Observable<string>;
  }
  
}
