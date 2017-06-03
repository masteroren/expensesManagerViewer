import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {InvoicesComponent} from "./invoices/invoices.component";
import {EmployeesComponent} from "./employees/employees.component";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'invoices'
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'employees',
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class RouteModule {

}
