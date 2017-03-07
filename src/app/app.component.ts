import { Component } from '@angular/core';
import {HttpService} from "./shared/services/httpService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {
  title = 'הוצאות';
  invoices: any[];

  constructor(private httpService: HttpService){
    httpService.invoices().subscribe(response => {
      this.invoices = response;
    })
  }
}
