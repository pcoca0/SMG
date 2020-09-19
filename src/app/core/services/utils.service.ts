import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProfileAFIP, ILocation, IIva } from '../interfaces/utils';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apis.productApi.url;
  perfilesAFIPPath = 'api/perfilesAFIP';
  localidadesPath = 'api/localidades';
  ivasPath = 'api/ivas';


  constructor(private http: HttpClient) { }

  getPerfilesAFIP(): Observable<Array<IProfileAFIP>> {
    return this.http.get(this.apiUrl + this.perfilesAFIPPath) as Observable<Array<IProfileAFIP>>;
  }

  getLocalidades(): Observable<Array<ILocation>> {
    return this.http.get(this.apiUrl + this.localidadesPath) as Observable<Array<ILocation>>;
  }

  getIvas(): Observable<Array<IIva>> {
    return this.http.get(this.apiUrl + this.ivasPath) as Observable<Array<IIva>>;
  }

}
