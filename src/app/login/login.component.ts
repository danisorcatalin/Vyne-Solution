import { Component } from '@angular/core';

import {LoginModel} from "../models/LoginModel";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: LoginModel = { username: '', password: '' };

  constructor(private loginService: LoginService) { }

  login() {
    this.loginService.loginUser(this.user).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
