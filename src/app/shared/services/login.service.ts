import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { IEmployee } from '../interfaces/IEmployee';

@Injectable()
export class LoginService {
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  canLogin(id: string): Observable<IEmployee> {
    let httpParams = new HttpParams()
      .set('id', id);

    return this.http.get<IEmployee>(`${environment.api}/login`, { params: httpParams });
  }
}
