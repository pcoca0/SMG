import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuardService implements CanLoad {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    let granted = false;

    if (this.tokenService.getToken()) {
      granted = true;
    }

    if (!granted) {
      this.router.navigate(['/']);
    }
    return granted;
  }
}
