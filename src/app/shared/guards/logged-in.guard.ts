import { IEmployee } from './../interfaces/IEmployee';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { isNullOrUndefined } from 'util';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!isNullOrUndefined(sessionStorage.getItem('user'))) {
      let employee: IEmployee = JSON.parse(sessionStorage.getItem('user'))[0];
      if (employee.isAdmin === 1) {
        this.loginService.isLoggedIn = true;
      }
    }

    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    return this.loginService.isLoggedIn;
  }
}
