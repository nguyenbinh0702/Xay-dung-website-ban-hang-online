import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { SelectDto } from './../../shared/models/dto/SelectDto';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { BillService } from './../../shared/services/bill.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/shared/models/bill';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-paid-deals',
  templateUrl: './paid-deals.component.html',
  styleUrls: ['./paid-deals.component.css']
})
// C-Ngan
export class PaidDealsComponent implements OnInit {

  private paidDeals;
  private totalElements: number;
  private pageSize: number;
  private currentPage: number;

  private searchForm: FormGroup;
  private brands;
  private airports;
  private list: Bill[] = [];


  constructor(private router: Router,
    private billService: BillService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {

    this.searchForm = this.fb.group({

      billCode: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      departure: ['', [Validators.required]],
      arrival: ['', [Validators.required]],
      taxCode: ['', [Validators.required]]
    })

 
    this.getPage(1);
    this.billService.getSelectDto().subscribe(data => {
      this.brands = data.brands
      this.airports = data.airports
    });

  }


  getPage(page: number) {

    this.paidDeals = this.billService.getSearchedBillsByAccountId(this.tokenStorage.getJwtResponse().accountId, page, this.searchForm).pipe(
      tap(res => {
        if (res != null) {
          this.totalElements = res.totalElements;
          this.pageSize = res.size;
          this.currentPage = page;
        } else {
          this.totalElements = 1;
          this.pageSize = 1;
          this.currentPage = 1;
        }


      }),
      map(res => {
        if (res != null) {
          return res.content
        } else {
          console.log(res);
          return this.list
        }
      })
    );


  }

  search() {
    this.getPage(1);
  }

  openBillList() {
    this.router.navigateByUrl('/customer/bills')
  }


}
