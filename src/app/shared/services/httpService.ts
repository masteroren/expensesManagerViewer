import { Injectable } from "@angular/core";
import { IEmployee } from "../interfaces/IEmployee";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  invoices() {
    return this.http.get(`${environment.api}/invoices`);
  }

  employees() {
    return this.http.get(`${environment.api}/users`);
  }

  addEmployee(data: IEmployee) {
    return this.http.post(`${environment.api}/user/add`, data);
  }

  updateEmployee(data: IEmployee) {
    return this.http.post(`${environment.api}/user/update`, data);
  }

  deleteEmployee(data: IEmployee) {
    return this.http.post(`${environment.api}/user/delete`, data);
  }

  deleteInvoice(id: number) {
    return this.http.post(`${environment.api}/invoices/delete`, { invoiceId: id });
  }
}
