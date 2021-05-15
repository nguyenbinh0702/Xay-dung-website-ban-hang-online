import { InvoiceTicketComponent } from './invoice-ticket/invoice-ticket.component';
import { FindFlightComponent } from './find-flight/find-flight.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { BillInvoiceComponent } from './bill-invoice/bill-invoice.component';
import { BillListComponent } from '../employee/bill-list/bill-list.component';
import { BillFindComponent } from './bill-find/bill-find.component';
import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { PromoCreateComponent } from './promo/promo-create/promo-create.component';
import { EmployeeCustomerCheckinComponent } from './employee-customer-checkin/employee-customer-checkin.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { UpdatePassengerComponent } from './update-passenger/update-passenger.component';
import { PromoEditComponent } from './promo/promo-edit/promo-edit.component';


const routes: Routes = [
  {
    path: '', component: EmployeeHomeComponent,
    children: [
      // creator Trương Khánh Mậu
      {
        path: 'employeeInfo', component: EmployeeInformationComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_EMPLOYEE'
        }
      },
      {
        path: 'management', component: CustomerManagementComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_EMPLOYEE'
        }
      },
      {
        path: 'tickets', loadChildren: () => import('../ticket/ticket.module').then(mod => mod.TicketModule)
      },
      {
        path: "findFlight", component: FindFlightComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_EMPLOYEE'
        }
      },
      { path: 'customer-checkin-list', component: EmployeeCustomerCheckinComponent },
      {
        path: "bill-list", component: BillListComponent, canActivate: [RoleGuard],
        data: {
          expectedRole: 'ROLE_EMPLOYEE'
        }
      },
      { path: "add-passenger", component: AddPassengerComponent },
      { path: "list-passenger/update/:id", component: UpdatePassengerComponent },
      { path: "promotion", component: PromoListComponent },
      { path: "promotion/create", component: PromoCreateComponent },
      { path: 'promotion/promo-edit/:id', component: PromoEditComponent },
    ],
  },

  {
    path: "bill-invoice", component: BillInvoiceComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_EMPLOYEE'
    }
  },
  {
    path: "bookTicket", component: BookTicketComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_EMPLOYEE'
    }
  },
  {
    path: "transaction/invoice/:id", component: InvoiceTicketComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_EMPLOYEE'
    }
  },
  {
    path: "bookTicket", component: BookTicketComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_EMPLOYEE'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class EmployeeRoutingModule {
}
