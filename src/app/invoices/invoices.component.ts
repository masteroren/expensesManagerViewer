import {Component, OnInit} from '@angular/core';
import {IInvoice} from "../shared/interfaces/IInvoice";
import {HttpService} from "../shared/services/httpService";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  title = 'הוצאות';
  invoices: IInvoice[];
  dt: Date = new Date();
  year: number;
  month: number;
  imageSrc: any;
  filterType: number;
  cols = [];
  imageContentToShow;
  showImageDialogFlag = false;

  constructor(private httpService: HttpService, private _domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getInvoices();

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

  deleteInvoice(dataTable) {
    dataTable.selection.forEach(item => {
      this.httpService.deleteInvoice(item.id).subscribe(response => {
        this.getInvoices();
      }, error => {

      })
    })
  }

  getInvoices() {
    this.httpService.invoices().subscribe((response: IInvoice[]) => {
      response.forEach((item: IInvoice) => {
        item._InvoiceDate = new Date(item.createDate).toLocaleDateString();
        item._InvoiceCreate = new Date(item.invoiceDate).toLocaleDateString();
      });
      this.invoices = response;
    });
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

  showImageDialog(imgSrc) {
    this.imageContentToShow = imgSrc;
    this.showImageDialogFlag = true;
  }

  processTableData(dataTable) {
    let csv = 'מספר עובד,שם עובד,סכום - חניה,סכום - כיבוד,סכום - אחר,סה"כ הוצאות,חודש הגשה,';

    console.log(dataTable);

    let invoiceArr = dataTable.value.sort(function (val1, val2) {
      return val1.empId - val2.empId;
    });

    let invoiceCreationMonth = invoiceArr[0]._InvoiceDate.split('/')[0] + '/' + invoiceArr[0]._InvoiceDate.split('/')[2];

    let currentEmp = {
      empId: invoiceArr[0].empId,
      employeeName: invoiceArr[0].employeeName,
      parkingAmount: 0,
      refreshmentsAmount: 0,
      otherAmount: 0,
      totalAmount: 0,
      month: invoiceCreationMonth
    };

    let dataToExport = [];

    invoiceArr.forEach(function (invoice, i) {

      if (invoice.empId != currentEmp.empId) {
        dataToExport.push(currentEmp);
        currentEmp = {
          empId: invoice.empId,
          employeeName: invoice.employeeName,
          parkingAmount: 0,
          refreshmentsAmount: 0,
          otherAmount: 0,
          totalAmount: 0,
          month: invoiceCreationMonth
        }
      }
      switch (invoice.type) {
        case "חנייה":
          currentEmp.parkingAmount += invoice.amount;
          break;

        case "אוכל":
          currentEmp.refreshmentsAmount += invoice.amount;
          break;

        case "אחר":
          currentEmp.otherAmount += invoice.amount;
          break;

        default:
          currentEmp.otherAmount += invoice.amount;
          break;
      }

      currentEmp.totalAmount += invoice.amount;

      if (i == invoiceArr.length - 1) {
        dataToExport.push(currentEmp);
      }
    });

    dataToExport.forEach(function (emp) {
      csv += '\n';
      for (let key in emp) {
        csv += emp[key];
        csv += dataTable.csvSeparator;
      }
    });

    return csv;
  }
}
