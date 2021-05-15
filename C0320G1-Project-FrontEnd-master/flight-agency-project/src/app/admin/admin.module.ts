import { ReportComponent } from './report/report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedbackContentDialogComponent } from './feedback-content-dialog/feedback-content-dialog.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CircleChartComponent } from './circle-chart/circle-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';



@NgModule({
  declarations: [FeedbackListComponent, ReportComponent, FeedbackContentDialogComponent, CircleChartComponent, LineChartComponent, BarChartComponent, LineChartComponent, PieChartComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [FeedbackContentDialogComponent, CircleChartComponent, LineChartComponent, BarChartComponent, LineChartComponent, PieChartComponent],
})
export class AdminModule { }
