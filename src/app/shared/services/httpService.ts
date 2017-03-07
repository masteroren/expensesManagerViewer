import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";

// const BASE_URL = 'http://192.168.30.6/ExpensesRest/';
const BASE_URL = 'http://expensesrest.orenwebtest.com/';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  invoices() {
    return this.http.get(`${BASE_URL}invoices`).map(res => res.json());
  }
}
