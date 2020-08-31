import { Injectable } from '@angular/core';
import { UserNew } from '../models/user-new';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login';
import { JwtDto } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(
    private http: HttpClient
  ) { }

  public addUser(nuevoUsuario: UserNew): Observable<any> {
    return this.http.post<any>(this.authURL + `nuevo`, nuevoUsuario);
  }

  public login(loginUsuario: UserLogin): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.authURL + `login`, loginUsuario);
  }
}
