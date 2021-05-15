import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Transaction } from 'src/app/shared/models/transaction';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  private reservationCode: number;
  private mTransaction: Transaction;
  private mData: any;
  private payPalConfig ?: IPayPalConfig;
  private totalPrice: number;
  private taxCode: string;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private toastr: ToastrService) {
    this.totalPrice = 0;
    this.taxCode = '4000242327';
  }

  ngOnInit() {
    this.reservationCode = Number(this.route.snapshot.paramMap.get('id'));
    this.paymentService.getReservationDetails(this.reservationCode).subscribe(
      data => {
        console.log(data);
        this.mData = data;
        this.mTransaction = data[0].transaction;
        this.totalPrice = data[0].transaction.price;
        this.initConfig();
      },
      error => console.log(error),
      () => console.log(this.mTransaction)
    );
  }

  get data() {
    return this.mData;
  }

  get transaction() {
    return this.mTransaction;
  }

  get flightSchedule() {
    return this.mTransaction.flightSchedule;
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
        this.paymentService.payTransaction(this.mTransaction.id, this.taxCode).subscribe((data) => {
            this.mTransaction = data;
            this.toastr.success('Thanh toán thành công');
        });
      },
      onError: err => {
        console.log(err);
        this.toastr.warning('Vui lòng thử lại.');
      }
    };
  }
}
