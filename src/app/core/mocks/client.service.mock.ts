import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IClientService } from '../interfaces/services/client.service';
import { IClientResponse } from '../interfaces/responses/client.response';

export class ClientServiceMock implements IClientService {


  clientsUrl = 'assets/mocks/Clients.json';
  private catalogClients: Observable<IClientResponse>;

  constructor(private http: HttpClient) { }

  getClients(): Observable<IClientResponse> {
    return this.catalogClients = this.http.get(this.clientsUrl) as Observable<IClientResponse>;

  }

}
