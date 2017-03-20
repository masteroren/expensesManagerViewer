import {Pipe, PipeTransform} from '@angular/core';
import {IInvoice} from "../shared/interfaces/IInvoice";

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(invoices: IInvoice[], args?: any): any {
    let year = args.year;
    let month = args.month;
    let type = args.type;

    if (year && month && type){
      return invoices.filter(item=>{

        let invoiceYear: number;
        let invoiceMonth: number;

        switch (type){
          case '0':
            invoiceYear = new Date(item.createDate).getFullYear();
            invoiceMonth = new Date(item.createDate).getMonth()+1;
            break;
          case '1':
            invoiceYear = new Date(item.invoiceDate).getFullYear();
            invoiceMonth = new Date(item.invoiceDate).getMonth()+1;
            break;
        }

        if (invoiceYear == year && invoiceMonth == month){
          return item;
        }
      });
    }

    return invoices;
  }
}
