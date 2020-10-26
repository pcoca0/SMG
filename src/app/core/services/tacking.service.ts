import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITrackInfoRequest } from '../interfaces/requests/track.request';
import { ITrackInfoResponse } from '../interfaces/responses/track.response';
import { IProductRequest } from '../interfaces/requests/product.request';

@Injectable({
  providedIn: 'root'
})
export class TackingService {

  apiUrl = environment.apis.productApi.url;
  seguimientoPath = 'api/seguimientos';

  constructor(private http: HttpClient) { }


  getAllTrack(): Observable<ITrackInfoResponse> {
    return this.http.get(this.apiUrl + this.seguimientoPath) as Observable<ITrackInfoResponse>;
  }

  getTrackByProducts(idProducto: string): Observable<ITrackInfoResponse> {
    return this.http.get(this.apiUrl + `api/seguimientos/producto/${idProducto}`) as Observable<ITrackInfoResponse>;
  }

  getSoldTrackingByProduct(idProducto: string): Observable<ITrackInfoResponse> {
    return this.http.get(this.apiUrl + `api/seguimientosVendidos/producto/${idProducto}`) as Observable<ITrackInfoResponse>;
  }

  getInStockTrackingByProduct(idProducto: string): Observable<ITrackInfoResponse> {
    return this.http.get(this.apiUrl + `api/seguimientosEnStock/producto/${idProducto}`) as Observable<ITrackInfoResponse>;
  }

  getTrack(idSeguimiento: string): Observable<ITrackInfoResponse> {
    return this.http.get(this.apiUrl + `api/seguimiento/${idSeguimiento}`) as Observable<ITrackInfoResponse>;
  }

  manageTracking(producto: IProductRequest): Observable<ITrackInfoResponse> {
    return this.http.post(this.apiUrl + `api/seguimiento/gestion`, producto) as Observable<ITrackInfoResponse>;
  }

  putTrack(id: string, seguimiento: ITrackInfoRequest): Observable<ITrackInfoResponse> {
    return this.http.put(this.apiUrl + `api/seguimiento/${id}/update`, seguimiento) as Observable<ITrackInfoResponse>;
  }

  deleteTrack(id: string): Observable<ITrackInfoResponse> {
    return this.http.delete(this.apiUrl + `api/seguimiento/${id}/delete`) as Observable<ITrackInfoResponse>;
  }
}
