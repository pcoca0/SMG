import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProfileAFIP, ILocation, IIva, ILocationUpdate, IBank, ITypeOfPaymentMethods } from '../interfaces/utils';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apis.productApi.url;
  perfilesAFIPPath = 'api/perfilesAFIP';
  localidadesPath = 'api/localidades';
  ivasPath = 'api/ivas';
  bancosPath = 'api/bancos';
  tiposDePagosPath = 'api/tiposDePagos';


  private localidades: Observable<Array<ILocationUpdate>>;


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

  getBancos(): Observable<Array<IBank>> {
    return this.http.get(this.apiUrl + this.bancosPath) as Observable<Array<IBank>>;
  }

  getTiposDePagos(): Observable<Array<ITypeOfPaymentMethods>> {
    return this.http.get(this.apiUrl + this.tiposDePagosPath) as Observable<Array<ITypeOfPaymentMethods>>;
  }

  // getLocalidadesUpdate(): Observable<Array<ILocationUpdate>> {
  //   return this.localidades = this.http.get('assets/mocks/Localidades.json') as Observable<Array<ILocationUpdate>>;
  // }

  // addLocation(localidad: ILocation): Observable<ILocation> {
  //   return this.http.post(this.apiUrl + `api/localidad/add`, localidad) as Observable<ILocation>;
  // }

}
