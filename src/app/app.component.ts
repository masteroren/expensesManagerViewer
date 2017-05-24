import {Component, OnInit} from '@angular/core';
import {HttpService} from "./shared/services/httpService";
import {IInvoice} from "./shared/interfaces/IInvoice";
import {DomSanitizer} from '@angular/platform-browser';

import * as moment from 'moment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title = 'הוצאות';
  invoices: IInvoice[];
  dt: Date = new Date();
  year: number;
  month: number;
  imageSrc: any;
  filterType: number;
  cols = [];
  selectedInvoices = [];
  imageContentToShow;
  showImageDialogFlag = false;

  constructor(private httpService: HttpService, private _domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.httpService.invoices().subscribe((response: IInvoice[]) => {
      response.forEach((item: IInvoice) => {
        item._InvoiceDate = new Date(item.createDate).toLocaleDateString();
        item._InvoiceCreate = new Date(item.invoiceDate).toLocaleDateString();
      });
      this.invoices = response;
      console.log(response);
    });

    this.cols = [
      {field: 'empId', header: 'מספר עובד'},
      {field: 'employeeName', header: 'שם עובד'},
      {field: 'type', header: 'סוג'},
      {field: 'amount', header: 'סכום'},
      {field: '_InvoiceDate', header: 'תאריך הגשה'},
      {field: '_InvoiceCreate', header: 'תאריך חשבונית'}
    ]
  }

  onDateChanged(e) {
    this.year = new Date(e).getFullYear();
    this.month = new Date(e).getMonth() + 1;
  }

  getImage(imageData: string) {
    return this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }

  onImageSelect(imageData: string) {
    this.imageSrc = this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }

  exportToCsv(dataTable) {
    dataTable.exportFilename = "חשבוניות";

    let csv = this.processTableData(dataTable);
    let link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv));
    link.setAttribute("download", dataTable.exportFilename + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  showImageDialog(imgSrc){
    this.imageContentToShow = imgSrc;
    this.showImageDialogFlag = true;
  }

  processTableData(dataTable){
    let csv = '';
    for (let i = 0; i < dataTable.columns.length; i++) {
      let currentHeaderField = dataTable.columns[i].field;
      if (currentHeaderField && currentHeaderField != 'image') {
        csv += dataTable.columns[i].header || dataTable.columns[i].field;
        if (i < 7) {
          csv += dataTable.csvSeparator;
        }
      }
    }

    //body
    this.selectedInvoices.forEach(function (record, i) {
      csv += '\n';

      for (let i_1 = 0; i_1 < dataTable.columns.length; i_1++) {
        let currentColField = dataTable.columns[i_1].field;
        if (currentColField && currentColField != 'image') {
          csv += record[currentColField];
          csv += dataTable.csvSeparator;
        }
      }
    });

    return csv;
  }

}
