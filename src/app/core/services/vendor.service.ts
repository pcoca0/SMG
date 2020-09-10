import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IVendorResponse, IVendorItemResponse } from '../interfaces/responses/vendor.response';

@Injectable({
  providedIn: 'root'
})
export class VendorService {


  apiUrl = environment.apis.productApi.url;
  proveedoresPath = 'api/preveedores';

  constructor(private http: HttpClient) { }

  getVendors(): Observable<IVendorResponse> {
    return this.http.get(this.apiUrl + this.proveedoresPath) as Observable<IVendorResponse>;
  }

  addVendor(proveedor: IVendorItemResponse): Observable<IVendorResponse> {
    return this.http.post(this.apiUrl + `api/proveedor/add`, proveedor) as Observable<IVendorResponse>;
  }
  putVendor(id: string, proveedor : IVendorItemResponse): Observable<IVendorResponse> {
    return this.http.put(this.apiUrl + `api/proveedor/${id}/update`, proveedor) as Observable<IVendorResponse>;
  }
  deleteVendor(id: string): Observable<IVendorResponse> {
    return this.http.delete(this.apiUrl + `api/proveedor/${id}/delete`) as Observable<IVendorResponse>;
  }
}
