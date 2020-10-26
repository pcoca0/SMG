import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICheckRequest } from '../interfaces/requests/check.request';
import { ICheckResponse } from '../interfaces/responses/check.response';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CheckService {

  apiUrl = environment.apis.productApi.url;

  constructor(private http: HttpClient) { }



getChecks(): Observable<ICheckResponse> {
  return this.http.get(this.apiUrl + `api/cheques`) as Observable<ICheckResponse>;
}

getFreeChecks(): Observable<ICheckResponse> {
  return this.http.get(this.apiUrl + `api/cheques/libres`) as Observable<ICheckResponse>;
}


addCheck(cheque: ICheckRequest): Observable<ICheckResponse> {
  return this.http.post(this.apiUrl + `api/cheque/add`, cheque) as Observable<ICheckResponse>;
}

putCheck(id: string, cheque: ICheckRequest): Observable<ICheckResponse> {
  return this.http.put(this.apiUrl + `api/cheque/${id}/update`, cheque) as Observable<ICheckResponse>;
}

deleteCheck(id: string): Observable<ICheckResponse> {
  return this.http.delete(this.apiUrl + `api/cheque/${id}/delete`) as Observable<ICheckResponse>;
}

}
