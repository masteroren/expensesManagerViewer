import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DatepickerModule, DropdownModule} from 'ng2-bootstrap';

import {AppComponent} from './app.component';
import {InvoiceFilterPipe} from './pipes/invoice-filter.pipe';
import {InvoiceItemComponent} from './invoice-item/invoice-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFilterPipe,
    InvoiceItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
