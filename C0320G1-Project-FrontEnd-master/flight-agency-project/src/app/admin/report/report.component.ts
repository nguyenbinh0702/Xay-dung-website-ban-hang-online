import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CircleChartComponent} from '../circle-chart/circle-chart.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineChartComponent} from '../line-chart/line-chart.component';
import {PieChartComponent} from '../pie-chart/pie-chart.component';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {ReportService} from '../../shared/services/report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  // Thành
  newReport: any;
  newReport1: any;
  private createReportForm: FormGroup;

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private reportService: ReportService) {
  }

  ngOnInit() {
    this.createReportForm = this.fb.group({
      chart: ['', Validators.required],
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      date3: [''],
      date4: [''],
      type: ['', Validators.required]
    });
  }

  openDialog(data, data1, data2, data3, data4): void {
    switch (this.createReportForm.get('chart').value) {
      case '1':
        const dialogRef = this.dialog.open(CircleChartComponent, {
          height: '600px',
          width: '750px',
          data: {data1: data, data2: data1, data3: data2, data4: data3, data5: data4},
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
      case '2':
        const dialogRef1 = this.dialog.open(LineChartComponent, {
          height: '600px',
          width: '750px',
          data: {data1: data, data2: data1, data3: data2, data4: data3, data5: data4},
          disableClose: true
        });

        dialogRef1.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
      case '3':
        const dialogRef2 = this.dialog.open(PieChartComponent, {
          height: '600px',
          width: '750px',
          data: {data1: data, data2: data1, data3: data2, data4: data3, data5: data4},
          disableClose: true
        });

        dialogRef2.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
      case '4':
        const dialogRef3 = this.dialog.open(BarChartComponent, {
          height: '600px',
          width: '750px',
          data: {data1: data, data2: data1, data3: data2, data4: data3, data5: data4},
          disableClose: true
        });

        dialogRef3.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        break;
    }
  }

  onSubmit() {
    if (this.createReportForm.get('type').value === '1') {
      this.newReport = {
        date1: this.createReportForm.value.date1,
        date2: this.createReportForm.value.date2
      };
      this.newReport1 = {
        date1: this.createReportForm.value.date3,
        date2: this.createReportForm.value.date4
      };
      if (this.newReport1.date1) {
        this.reportService.getAllReport(this.newReport).subscribe(
          data => {
            this.reportService.getAllReport(this.newReport1).subscribe(
              data1 => {
                this.openDialog(data, data1, this.newReport, this.newReport1, 1);
              });
          });
      } else {
        this.reportService.getAllReport(this.newReport).subscribe(
          data => {
            this.openDialog(data, null, this.newReport, null, 1);
          });
      }
    } else {
      this.newReport = {
        date1: this.createReportForm.value.date1,
        date2: this.createReportForm.value.date2
      };
      this.newReport1 = {
        date1: this.createReportForm.value.date3,
        date2: this.createReportForm.value.date4
      };
      if (this.newReport1.date1) {
        this.reportService.getAllAirline(this.newReport).subscribe(
          data => {
            this.reportService.getAllAirline(this.newReport1).subscribe(
              data1 => {
                this.openDialog(data, data1, this.newReport, this.newReport1, 2);
              });
          });
      } else {
        this.reportService.getAllAirline(this.newReport).subscribe(
          data => {
            this.openDialog(data, null, this.newReport, null, 2);
          });
      }
    }
  }
}
