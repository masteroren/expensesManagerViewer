import { Router } from '@angular/router';
import { LoginService } from './../../shared/services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private route: Router) { }

  login(id: string) {
    this.loginService.canLogin(id).subscribe(user => {
      if (user) {
        this.loginService.isLoggedIn = true;
        this.route.navigate(['/invoices']);
      }
    })
  }
}
