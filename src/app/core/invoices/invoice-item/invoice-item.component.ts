import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import { IInvoice } from '../../../shared/interfaces/IInvoice';

@Component({
  selector: 'invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit {

  @Input() invoice: IInvoice;
  @Output() onImageSelect: EventEmitter<string> = new EventEmitter();

  constructor(private _domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  convertDate(number: number): string {
    return new Date(number).toLocaleDateString();
  }

  getImage(imageData: string){
    return this._domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imageData);
  }

  onImageClick(imageData: string) {
    this.onImageSelect.emit(imageData);
  }
}
