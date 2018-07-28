import { FilterType } from './../../shared/enums/filterType.enum';
import { IDateRange } from './../../shared/components/month-picker/month-picker.component';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { IInvoice } from '../../shared/interfaces/IInvoice';
import { HttpService } from '../../shared/services/httpService';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
  public invoices: IInvoice[] = [];
  public dt: Date = new Date();
  public year: number;
  public month: number;
  private imageSrc: any;
  public filterType: string;
  private cols = [
    { field: 'empId', header: 'מספר עובד' },
    { field: 'employeeName', header: 'שם עובד' },
    { field: 'type', header: 'סוג' },
    { field: 'amount', header: 'סכום' },
    { field: '_InvoiceDate', header: 'תאריך הגשה' },
    { field: '_InvoiceCreate', header: 'תאריך חשבונית' }
  ]
  public imageContentToShow;
  public showImageDialogFlag = false;

  private dateRange: IDateRange;

  constructor(private httpService: HttpService, private _domSanitizer: DomSanitizer) {

  }

  onDateChanged(dateRange: IDateRange) {
    this.dateRange = dateRange;
    this.getInvoices(dateRange);
  }

  onFilterChanged() {
    this.getInvoices(this.dateRange);
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

  getInvoices(dateRange?: IDateRange) {
    this.httpService.invoices().subscribe((res: IInvoice[]) => {
      switch (this.filterType) {
        case "1":
          this.invoices = res.filter(p => p.createDate >= dateRange.start && p.createDate <= dateRange.end);
          break;
        case "0":
          this.invoices = res.filter(p => p.invoiceDate >= dateRange.start && p.invoiceDate <= dateRange.end);
          break;
      }
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
