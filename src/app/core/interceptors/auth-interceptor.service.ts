import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let inReq = req;
      const token = this.tokenService.getToken();
      if (token != null) {
        inReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
      }
      return next.handle(inReq);
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}];