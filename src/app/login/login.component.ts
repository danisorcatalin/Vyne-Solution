import {Component, OnDestroy} from '@angular/core';

import {LoginModel} from "../models/LoginModel";
import {LoginService} from "../services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{
  user: LoginModel = { username: '', password: '' };
  private subscription: Subscription | undefined;

  constructor(private loginService: LoginService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    this.subscription = this.loginService.loginUser(this.user).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
