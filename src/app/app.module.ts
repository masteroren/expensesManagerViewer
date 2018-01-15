import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatepickerModule } from 'ng2-bootstrap';
import { ButtonModule, DataTableModule, DialogModule, InputTextModule, DropdownModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { InvoiceFilterPipe } from './pipes/invoice-filter.pipe';
import { InvoiceItemComponent } from './invoice-item/invoice-item.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RouteModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFilterPipe,
    InvoiceItemComponent,
    InvoicesComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouteModule,
    DatepickerModule.forRoot(),
    DataTableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
