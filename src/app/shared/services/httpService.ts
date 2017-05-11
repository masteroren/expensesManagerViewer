import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

const BASE_URL = 'http://212.143.128.217:9200/';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  invoices() {
    return this.http.get(`${BASE_URL}invoices`).map(res => res.json());
  }
}
