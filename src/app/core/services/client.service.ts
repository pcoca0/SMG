import { Injectable } from '@angular/core';
import { IClientService } from '../interfaces/services/client.service';
import { Observable } from 'rxjs';
import { IClientResponse } from '../interfaces/responses/client.response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService{

  constructor(private http: HttpClient) { }

  getClients(): Observable<IClientResponse> {
    throw new Error("Method not implemented.");
  }
}
