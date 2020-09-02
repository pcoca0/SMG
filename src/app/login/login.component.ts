import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../core/models/user-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  usuarioLogin: UserLogin;
  usuario: string;
  password: string;
  roles: string[] = [];
  errorMsj: string;
  formLogin: FormGroup;
  private suscriptions: Subscription[] = [];


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.usuarioLogin = new UserLogin(this.formLogin.value.usuario, this.formLogin.value.password);
    this.suscriptions.push(this.authService.login(this.usuarioLogin).subscribe(
      data =>
       { this.isLogged = true;
         this.isLoginFail = false;

         this.tokenService.setToken(data.token);
         this.tokenService.setUserName(data.usuario);
         this.tokenService.setAuthorities(data.authorities);
         this.roles = data.authorities;
         this.router.navigate(['/gestion']);
       },
       err =>
          { 
            console.log(err);
            this.isLogged = false;
            this.isLoginFail = true;
            this.errorMsj = err.error.error;
            console.log(this.errorMsj);
          }
    ));
  }
}
