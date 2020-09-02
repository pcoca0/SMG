import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { UserNew } from '../../core/models/user-new';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() filterMatch: string;
  user: UserNew =  new UserNew();
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user.usuario = this.tokenService.getUserName();
    this.user.roles = this.tokenService.getAuthorities();

  }

  logOut() {
    this.tokenService.logout();
  }

}
