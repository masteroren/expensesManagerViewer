export interface IInvoice{
  empId?: number;
  employeeName: string;
  type: string;
  amount: number;
  invoiceDate: number;
  createDate: number;
  image: string;
  _InvoiceDate?: Date;
  _InvoiceCreate?: Date;
}
