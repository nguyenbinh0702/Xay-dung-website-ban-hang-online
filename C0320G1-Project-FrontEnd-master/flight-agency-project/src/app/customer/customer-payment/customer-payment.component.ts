import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { PaymentService } from '../../shared/services/payment.service';
import { Transaction } from '../../shared/models/transaction';
import { ToastrService } from './../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit {

  private payPalConfig?: IPayPalConfig;
  private transactions: Transaction[];
  private picked: number[];
  private pickedToCancel: number;
  private totalPrice: number;
  private accountId: number;
  private taxCode: string;

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService) {
    this.picked = [];
    this.totalPrice = 0;
    this.accountId = this.tokenStorage.getJwtResponse().accountId;
    this.taxCode = '4000242327';
  }

  ngOnInit() {
    this.initConfig();
    this.paymentService.getUnpaidTransaction(this.accountId).subscribe(data => {
      this.transactions = data;
    });
  }

  toggleCheckbox(id: number) {
    if (this.picked.includes(id)) {
      this.picked = this.picked.filter(value => value !== id);
    } else {
      this.picked.push(id);
    }
    this.calculateTotalPrice();
  }

  pickToCancel(id: number) {
    this.pickedToCancel = id;
    this.picked = this.picked.filter(value => value !== id);
  }

  cancelTransaction() {
    this.paymentService.cancelTransaction(this.pickedToCancel).subscribe(() => {
      this.transactions = this.transactions.filter(value => value.id !== this.pickedToCancel);
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.transactions.forEach(value => {
      if (this.picked.includes(value.id)) {
        this.totalPrice += value.price;
      }
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'AZcICsh9IJeenUMp6xcYeQv9XcK3l9m0Dw4yDhmGdAGy36CT12tMN7cAxOjpTHuWm_swoprxs0bbM-cN',
      style: {
        label: 'checkout',
        layout: 'vertical',
      },
      createOrderOnClient: () => {
        const price = (Math.round(this.totalPrice / 22000 * 100) / 100).toString();
        return {
          purchase_units: [{
            amount: {
              value: price
            }
          }]
        } as ICreateOrderRequest;
      },
      onApprove: () => {
        this.paymentService.payTransactions(this.picked, this.taxCode).subscribe(() => {
          this.paymentService.getUnpaidTransaction(this.accountId).subscribe(list => {
            this.transactions = list;
            this.picked = [];
            this.totalPrice = 0;
            this.toastr.success('Thanh toán thành công');
          });
        });
      },
      onError: err => {
        console.log(err);
        this.toastr.warning('Vui lòng thử lại.');
      }
    };
  }
}
