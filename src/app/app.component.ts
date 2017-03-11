import {Component} from '@angular/core';
import {HttpService} from "./shared/services/httpService";
import {IInvoice} from "./shared/interfaces/IInvoice";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {
  title = 'הוצאות';
  invoices: IInvoice[];

  constructor(private httpService: HttpService, private _domSanitizer: DomSanitizer) {
    httpService.invoices().subscribe((response: IInvoice[]) => {
      this.invoices = response;
    })
  }

  getImage(imageData){
    return this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }

}
