import { Injectable } from '@angular/core';
import { IClientService } from '../interfaces/services/client.service';
import { Observable } from 'rxjs';
import { IClientResponse, IClientItemResponse } from '../interfaces/responses/client.response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService{


  apiUrl = environment.apis.productApi.url;
  clientsPath = 'api/clientes';

  constructor(private http: HttpClient) { }

  getClients(): Observable<IClientResponse> {
    return this.http.get(this.apiUrl + this.clientsPath) as Observable<IClientResponse>;
  }

  addClient(cliente: IClientItemResponse): Observable<IClientResponse> {
    return this.http.post(this.apiUrl + `api/cliente/add`, cliente) as Observable<IClientResponse>;
  }
  putClient(id: string, cliente : IClientItemResponse): Observable<IClientResponse> {
    return this.http.put(this.apiUrl + `api/cliente/${id}/update`, cliente) as Observable<IClientResponse>;
  }
  deleteClient(id: string): Observable<IClientResponse> {
    return this.http.delete(this.apiUrl + `api/cliente/${id}/delete`) as Observable<IClientResponse>;
  }
}
