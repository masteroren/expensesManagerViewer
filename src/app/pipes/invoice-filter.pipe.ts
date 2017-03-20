import {Pipe, PipeTransform} from '@angular/core';
import {IInvoice} from "../shared/interfaces/IInvoice";

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(invoices: IInvoice[], args?: any): any {
    let year = args.year;
    let month = args.month;

    if (year && month){
      return invoices.filter(item=>{
        let invoiceYear = new Date(item.createDate).getFullYear();
        let invoiceMonth = new Date(item.createDate).getMonth()+1;

        if (invoiceYear == year && invoiceMonth == month){
          return item;
        }
      });
    }

    return invoices;
  }
}
