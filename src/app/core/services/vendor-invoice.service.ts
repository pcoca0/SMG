import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVendorInvoiceRequest } from '../interfaces/requests/vendor-invoice.request';
import { IVendorInvoiceResponse } from '../interfaces/responses/vendor-invoice.response';

@Injectable({
  providedIn: 'root'
})
export class VendorInvoiceService {

 
  apiUrl = environment.apis.productApi.url; 
  vendorInvoicetPath = 'api/proveedor/facturas';

  constructor(private http: HttpClient) { }

  getVendorInvoices(): Observable<IVendorInvoiceResponse> {
    return this.http.get(this.apiUrl + this.vendorInvoicetPath) as Observable<IVendorInvoiceResponse>;
  }

  getVendorInvoice(id: string): Observable<IVendorInvoiceResponse> {
    return this.http.get(this.apiUrl + `api/proveedor/factura/${id}`) as Observable<IVendorInvoiceResponse>;
  }

  addVendorInvoice(facturaProveedor: IVendorInvoiceRequest): Observable<IVendorInvoiceResponse> {
    return this.http.post(this.apiUrl + `api/proveedor/factura/add`, facturaProveedor) as Observable<IVendorInvoiceResponse>;
  }
  putVendorInvoice(id: string, facturaProveedor : IVendorInvoiceRequest): Observable<IVendorInvoiceResponse> {
    return this.http.put(this.apiUrl + `api/proveedor/factura/${id}/update`, facturaProveedor) as Observable<IVendorInvoiceResponse>;
  }
  deleteVendorInvoice(id: string): Observable<IVendorInvoiceResponse> {
    return this.http.delete(this.apiUrl + `api/proveedor/factura/${id}/delete`) as Observable<IVendorInvoiceResponse>;
  }
  addVendorSpend(facturaProveedor: IVendorInvoiceRequest): Observable<IVendorInvoiceResponse> {
    return this.http.post(this.apiUrl + `api/proveedor/gasto/add`, facturaProveedor) as Observable<IVendorInvoiceResponse>;
  }

  getVendorInvoiceUnPaid(idProveedor: string): Observable<IVendorInvoiceResponse> {
    return this.http.get(this.apiUrl + `api/proveedor/facturasAdeudadas/${idProveedor}`) as Observable<IVendorInvoiceResponse>;
  }

  getVendorInvoicePaidProveedor(idProveedor: string): Observable<IVendorInvoiceResponse> {
    return this.http.get(this.apiUrl + `api/proveedor/facturasPagadas/${idProveedor}`) as Observable<IVendorInvoiceResponse>;
  }
}
