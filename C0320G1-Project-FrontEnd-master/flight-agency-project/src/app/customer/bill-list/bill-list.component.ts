import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { BillService } from './../../shared/services/bill.service';
import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/shared/models/bill';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

declare var $: any
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  private bills: Observable<Bill[]>;
  private totalElements: number;
  private pageSize: number;
  private currentPage: number;
  private bill: Bill;
  private checkboxValues: Array<string> = new Array();

  constructor(private billService: BillService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.getPage(1);
    $(document).ready(function () {
      $("#checkAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
      });
    });

  }

  getPage(page: number) {

    this.bills = this.billService.getBillsByAccountId(this.tokenStorage.getJwtResponse().accountId, page).pipe(
      tap(res => {
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = page;
      }),
      map(res => res.content)
    )
    if ($('#checkAll').prop("checked") == true) {
      $('input:checkbox').prop('checked', true);
    }
  }

  preparePdf() {
    this.billService.getBillById($("input[name='billId']:checked").val()).subscribe(data => {
      this.bill = data;
    });
  }

  getCheckBoxValue(id: any) {
    if (!this.checkboxValues.includes(id.target.value)) {
      this.checkboxValues.push(id.target.value);
    } else {

      this.checkboxValues.splice(this.checkboxValues.indexOf(id), 1)

    }
  }
  printBill() {
    for (let i = 0; i < this.checkboxValues.length; i++) {

      this.billService.getBillById((Number(this.checkboxValues[i]))).subscribe(data => {
        this.bill = data;
        $('#print').click()

      });
    }

  }
}
