import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Transaction } from './../../shared/models/transaction';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/shared/models/dto/Page';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-deal-record',
  templateUrl: './deal-record.component.html',
  styleUrls: ['./deal-record.component.css']
})
// C-Ngan
export class DealRecordComponent implements OnInit {

  private deals: Observable<Transaction[]>;
  private totalElements: number;
  private pageSize: number;
  private currentPage: number;

  constructor(private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
  }


  ngOnInit() {
    this.getPage(1);

  }

  getPage(page: number) {
    console.log(page)
    this.deals = this.transactionService.getAllTransactionsByAccountId(this.tokenStorage.getJwtResponse().accountId, page).pipe(
      tap(res => {
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = page;
      }),
      map(res => res.content)
    )

  }


}
