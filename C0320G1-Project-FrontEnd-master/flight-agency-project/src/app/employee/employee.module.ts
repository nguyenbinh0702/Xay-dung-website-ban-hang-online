import { BillInvoiceComponent } from './bill-invoice/bill-invoice.component';
import { BillListComponent } from './../employee/bill-list/bill-list.component';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeCustomerCheckinComponent } from './employee-customer-checkin/employee-customer-checkin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { MatStepperModule } from '@angular/material';
import { BookTicketStep1Component } from './book-ticket/book-ticket-step1/book-ticket-step1.component';
import { BookTicketStep2Component } from './book-ticket/book-ticket-step2/book-ticket-step2.component';
import { FindFlightComponent } from './find-flight/find-flight.component';
import { InvoiceTicketComponent } from './invoice-ticket/invoice-ticket.component';
import { registerLocaleData } from '@angular/common';
import localVi from '@angular/common/locales/vi';
import { NgxPaginationModule } from 'ngx-pagination';
import { BillFindComponent } from './bill-find/bill-find.component';
import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { PromoCreateComponent } from './promo/promo-create/promo-create.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { UpdatePassengerComponent } from './update-passenger/update-passenger.component';
import { PromoEditComponent } from './promo/promo-edit/promo-edit.component';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';




registerLocaleData(localVi);
@NgModule({
  declarations: [
    BookTicketComponent,
    BookTicketStep1Component,
    BookTicketStep2Component,
    FindFlightComponent,
    InvoiceTicketComponent,
    BillFindComponent,
    BillListComponent,
    BillInvoiceComponent,
    PromoListComponent,
    PromoCreateComponent,
    EmployeeCustomerCheckinComponent,
    EmployeeTableComponent,
    EmployeeListComponent,
    EmployeeInformationComponent,
    EmployeeHomeComponent,
    CustomerManagementComponent,
    AddPassengerComponent,
    UpdatePassengerComponent,
    PromoEditComponent,
    PromoListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  exports : [
    EmployeeTableComponent
  ],
  entryComponents: [BillFindComponent]

})
export class EmployeeModule {
}
