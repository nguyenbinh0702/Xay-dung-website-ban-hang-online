import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { RoleGuard } from '../guards/role.guard';


const routes: Routes = [
  {
    path: '', component: ListTicketComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_EMPLOYEE'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
