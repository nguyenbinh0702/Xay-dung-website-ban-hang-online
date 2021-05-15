import { BillListComponent } from './bill-list/bill-list.component';
import { PaidDealsComponent } from './paid-deals/paid-deals.component';
import { DealRecordComponent } from './deal-record/deal-record.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPaymentComponent } from './customer-payment/customer-payment.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerPasswordComponent } from './customer-password/customer-password.component';



import { RoleGuard } from '../guards/role.guard';



const routes: Routes = [
  {
    path: "", component: CustomerHomeComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_USER'
    }, children: [
      {
        path: "deals", component: DealRecordComponent
      },
      { path: "paid-deals", component: PaidDealsComponent },
      { path: "bills", component: BillListComponent },
      { path: 'payment', component: CustomerPaymentComponent },
      { path: 'info', component: CustomerInfoComponent },
      { path: 'change-password', component: CustomerPasswordComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
