import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {IEmployee} from "../interfaces/IEmployee";

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  invoices() {
    return this.http.get(`api/invoices`).map(res => res.json());
  }

  employees() {
    return this.http.get(`api/users`).map(res => res.json());
  }

  addEmployee(data: IEmployee) {
    return this.http.post('api/user/add', data).map(res => res.json());
  }

  updateEmployee(data: IEmployee) {
    return this.http.post('api/user/update', data).map(res => res.json());
  }

  deleteEmployee(data: IEmployee) {
    return this.http.post('api/user/delete', data).map(res => res.json());
  }

  deleteInvoice(id: number) {
    return this.http.post('api/invoices/delete', {invoiceId: id}).map(res => res.json());
  }
}
