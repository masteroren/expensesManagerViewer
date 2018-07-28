import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  ButtonModule,
  DataTableModule,
  DialogModule,
  InputTextModule,
  DropdownModule,
  CalendarModule,
  RadioButtonModule
} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { RouteModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { InvoiceFilterPipe } from './shared/pipes/invoice-filter.pipe';
import { InvoiceItemComponent } from './core/invoices/invoice-item/invoice-item.component';
import { InvoicesComponent } from './core/invoices/invoices.component';
import { EmployeesComponent } from './core/employees/employees.component';
import { LoginComponent } from './core/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginService } from './shared/services/login.service';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { MonthPickerComponent } from './shared/components/month-picker/month-picker.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFilterPipe,
    InvoiceItemComponent,
    InvoicesComponent,
    EmployeesComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouteModule,
    DataTableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    SharedModule
  ],
  providers: [LoginService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
