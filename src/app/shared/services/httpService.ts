import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

const BASE_URL = 'http://192.168.10.155:8080/';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  invoices() {
    return this.http.get(`${BASE_URL}invoices`).map(res => res.json());
  }
}
