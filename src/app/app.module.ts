import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DatepickerModule} from 'ng2-bootstrap';
import {DataTableModule, DialogModule} from 'primeng/primeng';
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
    DataTableModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
