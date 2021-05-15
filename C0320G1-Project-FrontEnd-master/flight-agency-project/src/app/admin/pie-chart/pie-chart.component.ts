import {Component, Inject, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {Workbook} from "@syncfusion/ej2-excel-export";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  // Thành
  constructor(
    public dialogRef: MatDialogRef<PieChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  x = [];
  y = [];
  pieChart = [];
  total = 0;
  total1 = 0;
  total2 = 0;
  total3 = 0;
  total4 = 0;
  total5 = 0;
  total6 = 0;
  total7 = 0;

  ngOnInit() {
    if (this.data.data5 === 1) {
      if (this.data.data4 == null) {
        this.x.push(this.data.data3.date1 + ' - ' + this.data.data3.date2);
      } else {
        this.x.push(this.data.data3.date1 + ' - ' + this.data.data3.date2, this.data.data4.date1 + ' - ' + this.data.data4.date2);
      }
      if (this.data.data2 == null) {
        this.data.data1.forEach(x => {
          this.total += x.total;
        });
        this.y.push(this.total);
      } else {
        this.data.data1.forEach(x => {
          this.total += x.total;
        });
        this.data.data2.forEach(x => {
          this.total1 += x.total;
        });
        this.y.push(this.total, this.total1);
      }
    } else {
      if (this.data.data4 == null) {
        this.x.push('VietjetAir', 'Pacific Airlines', 'BambooAirWay', 'Vietnam Airlines');
      } else {
        // tslint:disable-next-line:max-line-length
        this.x.push('VietjetAir', 'Pacific Airlines', 'BambooAirWay', 'Vietnam Airlines', 'VietjetAir', 'Pacific Airlines', 'BambooAirWay', 'Vietnam Airlines');
      }
      if (this.data.data2 == null) {
        this.data.data1.forEach(x => {
          if (x.name === 'VietjetAir') {
            this.total += x.total;
          } else if (x.name === 'Pacific Airlines') {
            this.total1 += x.total;
          } else if (x.name === 'BamBooAirWay') {
            this.total2 += x.total;
          } else if (x.name === 'Vietnam Airlines') {
            this.total3 += x.total;
          }
        });
        this.y.push(this.total, this.total1, this.total2, this.total3);
      } else {
        this.data.data1.forEach(x => {
          if (x.name === 'VietjetAir') {
            this.total += x.total;
          } else if (x.name === 'Pacific Airlines') {
            this.total1 += x.total;
          } else if (x.name === 'BamBooAirWay') {
            this.total2 += x.total;
          } else if (x.name === 'Vietnam Airlines') {
            this.total3 += x.total;
          }
        });
        this.data.data2.forEach(x => {
          if (x.name === 'VietjetAir') {
            this.total4 += x.total;
          } else if (x.name === 'Pacific Airlines') {
            this.total5 += x.total;
          } else if (x.name === 'BamBooAirWay') {
            this.total6 += x.total;
          } else if (x.name === 'Vietnam Airlines') {
            this.total7 += x.total;
          }
        });
        this.y.push(this.total, this.total1, this.total2, this.total3, this.total4, this.total5, this.total6, this.total7);
      }
    }

    this.pieChart = new Chart('myChart', {
      type: 'polarArea',
      data: {
        labels: this.x,
        datasets: [{
          label: 'Doanh thu theo khoảng ngày',
          data: this.y,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  public Export = () => {
    const rowDatas: object[] = [];
    if (this.data.data5 === 1) {
      rowDatas.push({
        index: 1,
        cells: [
          {
            index: 1, value: '<b>Ngày</b>'
          },
          {
            index: 2, value: '<b>Doanh thu</b>'
          }
        ]
      });
      // tslint:disable-next-line:ban-types
      for (let i = 0; i < this.data.data1.length; i++) {
        rowDatas.push({
          index: 2 + i,
          cells:
            [
              {index: 1, value: this.data.data1[i].date},
              {index: 2, value: this.data.data1[i].total},

            ]
        });
      }
      rowDatas.push({
        index: this.data.data1.length + 2,
        cells:
          [
            {index: 1, value: '<b>Tổng</b>'},
            {index: 2, value: this.total}
          ]
      });
      if (this.data.data2 != null) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.data.data2.length; i++) {
          rowDatas.push({
            index: this.data.data1.length + 3 + i,
            cells:
              [
                {index: 1, value: this.data.data2[i].date},
                {index: 2, value: this.data.data2[i].total},

              ]
          });
        }
        rowDatas.push({
          index: this.data.data1.length + this.data.data2.length + 3,
          cells:
            [
              {index: 1, value: '<b>Tổng</b>'},
              {index: 2, value: this.total1}
            ]
        });
      }
    } else {
      if (this.data.data2 == null) {
        rowDatas.push({
          index: 1,
          cells: [
            {
              index: 1, value: '<b>Ngày</b>'
            },
            {
              index: 2, value: this.data.data3.date1 + ' - ' + this.data.data3.date2
            }
          ]
        });
        rowDatas.push({
          index: 2,
          cells: [
            {
              index: 1, value: '<b>Hãng</b>'
            },
            {
              index: 2, value: '<b>Doanh thu</b>'
            }
          ]
        });
        for (let i = 0; i < this.x.length; i++) {
          rowDatas.push({
            index: 3 + i,
            cells:
              [
                {index: 1, value: this.x[i]},
                {index: 2, value: this.y[i]},
              ]
          });
        }
        rowDatas.push({
          index: this.x.length + 3,
          cells:
            [
              {index: 1, value: '<b>Tổng</b>'},
              {index: 2, value: this.total + this.total1 + this.total2 + this.total3}
            ]
        });
      } else {
        rowDatas.push({
          index: 1,
          cells: [
            {
              index: 1, value: '<b>Ngày</b>'
            },
            {
              index: 2, value: this.data.data3.date1 + ' - ' + this.data.data3.date2
            }
          ]
        });
        rowDatas.push({
          index: 2,
          cells: [
            {
              index: 1, value: '<b>Hãng</b>'
            },
            {
              index: 2, value: '<b>Doanh thu</b>'
            }
          ]
        });
        for (let i = 0; i < this.x.length / 2; i++) {
          rowDatas.push({
            index: 3 + i,
            cells:
              [
                {index: 1, value: this.x[i]},
                {index: 2, value: this.y[i]},
              ]
          });
        }
        rowDatas.push({
          index: this.x.length / 2 + 3,
          cells:
            [
              {index: 1, value: '<b>Tổng</b>'},
              {index: 2, value: this.total + this.total1 + this.total2 + this.total3}
            ]
        });
        rowDatas.push({
          index: this.x.length,
          cells: [
            {
              index: 1, value: '<b>Ngày</b>'
            },
            {
              index: 2, value: this.data.data4.date1 + ' - ' + this.data.data4.date2
            }
          ]
        });
        rowDatas.push({
          index: this.x.length + 1,
          cells: [
            {
              index: 1, value: '<b>Hãng</b>'
            },
            {
              index: 2, value: '<b>Doanh thu</b>'
            }
          ]
        });
        // tslint:disable-next-line:prefer-for-of
        for (let i = 4; i < this.x.length; i++) {
          rowDatas.push({
            index: this.x.length / 2 + 2 + i,
            cells:
              [
                {index: 1, value: this.x[i]},
                {index: 2, value: this.y[i]},

              ]
          });
        }
        rowDatas.push({
          index: this.x.length + 6,
          cells:
            [
              {index: 1, value: '<b>Tổng</b>'},
              {index: 2, value: this.total4 + this.total5 + this.total6 + this.total7}
            ]
        });
      }
    }

    const book: Workbook = new Workbook({
      worksheets: [
        {
          rows: rowDatas
        }
      ],

    }, 'xlsx');
    book.save('ChartExport.xlsx');
  }
}
