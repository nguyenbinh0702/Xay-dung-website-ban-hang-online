import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { PriceInfo } from './../../shared/models/dto/price-info';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-booking-detail',
  templateUrl: './flight-booking-detail.component.html',
  styleUrls: ['./flight-booking-detail.component.css']
})
export class FlightBookingDetailComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.transactionService.depPriceInfo = this.calcPrice(this.departureInfo.price);
    if (this.returnInfo != null)
      this.transactionService.retPriceInfo = this.calcPrice(this.returnInfo.price);
  }

  close() {
    this.transactionService.depPriceInfo = [];
    this.transactionService.retPriceInfo = [];
    this.modal.close();
  }

  goTo() {
    this.router.navigateByUrl('/flight/confirm');
    this.modal.close();
  }

  calcPrice(price: number): PriceInfo[] {
    const info: PriceInfo[] = []
    //adult
    const adultPrice = this.setPriceInfo('Người lớn', this.bookingInfo.adults, price, 1);
    info.push(adultPrice);
    // children
    if (this.bookingInfo.children > 0) {
      const childrenPrice = this.setPriceInfo('Trẻ em', this.bookingInfo.children, price, 0.75);
      info.push(childrenPrice);
    }
    // babies
    if (this.bookingInfo.babies > 0) {
      const childrenPrice = this.setPriceInfo('Em bé', this.bookingInfo.babies, price, 0.1);
      info.push(childrenPrice);
    }
    return info;
  }

  setPriceInfo(type: string, quantity: number, price: number, discount: number): PriceInfo {
    let priceInfo = {} as PriceInfo;
    priceInfo.passengerType = type;
    priceInfo.quantity = quantity;
    priceInfo.netPrice = price * quantity * discount;
    priceInfo.tax = priceInfo.netPrice * 0.1;
    priceInfo.totalPrice = priceInfo.netPrice + priceInfo.tax;
    return priceInfo;
  }

  get departureInfo() {
    return this.transactionService.departureFlight;
  }

  get returnInfo() {
    return this.transactionService.returnFlight;
  }

  get bookingInfo() {
    return this.transactionService.bookingInfo;
  }

  get depPriceInfo() {
    return this.transactionService.depPriceInfo;
  }

  get retPriceInfo() {
    return this.transactionService.retPriceInfo;
  }
}
