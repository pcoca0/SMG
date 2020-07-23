import { Injectable } from '@angular/core';
import { IClientResponse } from '../responses/client.response';
import { Observable } from 'rxjs';


export interface IClientService {
  getClients(): Observable<IClientResponse>;

}
