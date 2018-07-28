import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './core/login/login.component';
import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { InvoicesComponent } from "./core/invoices/invoices.component";
import { EmployeesComponent } from "./core/employees/employees.component";
import { LoggedInGuard } from './shared/guards/logged-in.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'invoices'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [LoggedInGuard],
    children: [
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ]
})
export class RouteModule {

}
