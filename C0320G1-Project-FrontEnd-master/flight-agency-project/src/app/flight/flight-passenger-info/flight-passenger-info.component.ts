import { Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList, ComponentRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { OnewayDirective } from '../oneway.directive';
import { FlightOnewayBookingComponent } from '../flight-oneway-booking/flight-oneway-booking.component';
import { FlightSearchDTO } from 'src/app/shared/models/dto/flight-search-dto';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { PriceInfo } from './../../shared/models/dto/price-info';
import { PassengerInfoDTO } from './../../shared/models/passenger';

@Component({
  selector: 'app-flight-passenger-info',
  templateUrl: './flight-passenger-info.component.html',
  styleUrls: ['./flight-passenger-info.component.css']
})
export class FlightPassengerInfoComponent implements OnInit, AfterViewInit {

  @ViewChildren(OnewayDirective) entry: QueryList<OnewayDirective>

  // selected flight
  private departurePassenger: Array<PassengerInfoDTO> = null;
  private departureComponent: ComponentRef<FlightOnewayBookingComponent>;
  private returnPassenger: Array<PassengerInfoDTO> = null;
  private returnComponent: ComponentRef<FlightOnewayBookingComponent>;
  private depPeople: string[] = [];
  private retPeople: string[] = [];

  errors: string;
  constructor(
    private resolver: ComponentFactoryResolver,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.transactionService.depPriceInfo.forEach(info => {
      let i = info.quantity;
      while (i > 0) {
        if (info.passengerType != 'Em bé')
          this.depPeople.push(info.passengerType);
        i--;
      }
    })
    if (this.transactionService.returnFlight != null)
      this.transactionService.retPriceInfo.forEach(info => {
        let i = info.quantity;
        while (i > 0) {
          if (info.passengerType != 'Em bé')
            this.retPeople.push(info.passengerType);
          i--;
        }
      })
  }

  book() {
    if (this.departurePassenger == null) {
      this.errors = 'Vui lòng điền thông tin hành khách chuyến bay đi';
      return;
    }
    let notValid = this.departurePassenger.some(val => val == null);
    console.log(`depVali: ${notValid}`);
    if (!notValid) {
      this.transactionService.departurePassenger = this.departurePassenger;
    } else {
      this.errors = 'Vui lòng điền thông tin hành khách chuyến bay đi';
      return;
    }
    if (this.transactionService.returnFlight != null) {
      if (this.returnPassenger == null) {
        this.errors = 'Vui lòng điền thông tin hành khách chuyến bay về';
        return;
      }
      notValid = this.returnPassenger.some(val => val == null)
      console.log(`retVali: ${notValid}`);
      if (!notValid) {
        this.transactionService.returnPassenger = this.returnPassenger;
      } else {
        this.errors = 'Vui lòng điền thông tin hành khách chuyến bay về';
        return;
      }
    }
    this.errors = '';
    this.transactionService.createTransaction().subscribe(() => {
      this.router.navigateByUrl("/customer/payment")
    });
    // console.log(this.departurePassenger);
    // console.log(this.returnPassenger);
  }

  ngAfterViewInit() {
    this.departureComponent = this.loadComponent(0, this.transactionService.departureFlight, this.depPeople, this.transactionService.depPriceInfo);
    this.departureComponent.instance.passengers.subscribe(data => {
      this.departurePassenger = data;
    })
    if (this.transactionService.returnFlight != null) {
      this.returnComponent = this.loadComponent(1, this.transactionService.returnFlight, this.retPeople, this.transactionService.retPriceInfo);
      this.returnComponent.instance.passengers.subscribe(data => {
        this.returnPassenger = data;
      })
    }
  }

  loadComponent(index: number, flightInfo: FlightSchedule, persons: string[], priceInfo: PriceInfo[]): ComponentRef<FlightOnewayBookingComponent> {
    // clear component
    this.entry.toArray()[index].viewContainer.clear();
    const resolver = this.resolver.resolveComponentFactory(FlightOnewayBookingComponent);

    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolver);
    componentRef.instance.depInfo = flightInfo;
    componentRef.instance.priceInfo = priceInfo;
    componentRef.instance.people = persons;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }
}
