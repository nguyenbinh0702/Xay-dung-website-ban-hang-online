import { EmployeeTableComponent } from './../employee/employee-table/employee-table.component';
import { EmployeeModule } from './../employee/employee.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { RoleGuard } from '../guards/role.guard';
import { ReportComponent } from './report/report.component';


const routes: Routes = [

  {
    path : '',component : AdminHomeComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    },children : [
      {
        path: 'report', component: ReportComponent
      },
      {
        path: 'feedback-list', component: FeedbackListComponent
      },
      {
        path : 'employee-table', component : EmployeeTableComponent
      }
    ]
    
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EmployeeModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
