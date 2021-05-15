import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightBookingDetailComponent } from '../flight-booking-detail/flight-booking-detail.component';
import { OnewayDirective } from '../oneway.directive';
import { FlightOnewayScheduleComponent } from '../flight-oneway-schedule/flight-oneway-schedule.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightSearchDTO } from './../../shared/models/dto/flight-search-dto';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { ActivatedRoute, Router } from '@angular/router';
import { Airport } from './../../shared/models/airport';
import { TransactionService } from './../../shared/services/transaction.service';
import { checkInterval, compare } from 'src/app/shared/validations/validation';
import { FlightScheduleService } from 'src/app/shared/services/flight-schedule.service';

@Component({
  selector: 'app-flight-schedule-list',
  templateUrl: './flight-schedule-list.component.html',
  styleUrls: ['./flight-schedule-list.component.css']
})
export class FlightScheduleListComponent implements OnInit, AfterViewInit {

  @ViewChildren(OnewayDirective) entry: QueryList<OnewayDirective>;

  readonly MAX_PEOPLE = new Array(6);
  searchForm: FormGroup;
  airportList: Airport[];
  depId = -1;
  arrId = -1;
  errors = '';
  today = new Date();
  // selected flight
  private departureFlight: FlightSchedule = null;
  private departureComponent: ComponentRef<FlightOnewayScheduleComponent>;
  private returnFlight: FlightSchedule = null;
  private returnComponent: ComponentRef<FlightOnewayScheduleComponent>;
  private noOfWay: number;

  constructor(
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private bookingService: TransactionService,
    private flightScheduleService: FlightScheduleService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { airports: Airport[] }) => {
      this.airportList = data.airports;
    });
    this.noOfWay = 1;
    this.searchForm = this.fb.group({
      sortBy: [''],
      isRoundTrip: [''],
      departure: [1, [Validators.required]],
      arrival: [12, [Validators.required]],
      depDate: [new Date(), [Validators.required]],
      retDate: [{ value: new Date(), disabled: true }],
      babies: [0, [Validators.required]],
      children: [0, [Validators.required]],
      adults: [1, [Validators.required]]
    }, {
      validators: [compare]
    });
  }

  ngAfterViewInit() {
    this.searchForm.patchValue({
      sortBy: '',
      isRoundTrip: this.flightScheduleService.flightSearchForm.isRoundTrip,
      departure: this.flightScheduleService.flightSearchForm.departureAirport,
      arrival: this.flightScheduleService.flightSearchForm.arrivalAirport,
      depDate: this.flightScheduleService.flightSearchForm.departureDateTime,
      retDate: this.flightScheduleService.flightSearchForm.arrivalDateTime,
      babies: this.flightScheduleService.flightSearchForm.babies,
      children: this.flightScheduleService.flightSearchForm.children,
      adults: this.flightScheduleService.flightSearchForm.adults,
    });
    this.onSubmit();
  }


  confirmBooking() {
    // check time betwwen 2 flight
    this.bookingService.departureFlight = this.departureFlight;
    this.bookingService.bookingInfo = this.searchForm.value;
    if (this.noOfWay === 2) {
      const isValid = checkInterval(this.returnFlight.departureDateTime, this.departureFlight.departureDateTime, 240);
      if (isValid) {
        this.bookingService.returnFlight = this.returnFlight;
        this.errors = '';
      } else {
        this.errors = 'Thời gian giữa hai chuyến bay cách nhau ít nhất 4h. Vui lòng chọn lại.';
        return;
      }
    }
    this.modalService.open(FlightBookingDetailComponent, { size: 'lg' });
  }

  onSubmit() {
    const depSchedule: FlightSearchDTO = {
      sortBy: this.searchForm.get('sortBy').value,
      departure: this.searchForm.get('departure').value,
      arrival: this.searchForm.get('arrival').value,
      depDate: this.searchForm.get('depDate').value,
      babies: this.searchForm.get('babies').value,
      children: this.searchForm.get('children').value,
      adults: this.searchForm.get('adults').value
    };
    this.noOfWay = 1;
    this.departureComponent = this.loadComponent(0, depSchedule);
    this.departureComponent.instance.sel.subscribe(data => {
      this.departureFlight = data;
    });
    if (this.isRoundTrip.value === '1') {
      const retSchedule: FlightSearchDTO = {
        sortBy: this.searchForm.get('sortBy').value,
        departure: this.searchForm.get('arrival').value,
        arrival: this.searchForm.get('departure').value,
        depDate: this.searchForm.get('retDate').value,
        babies: this.searchForm.get('babies').value,
        children: this.searchForm.get('children').value,
        adults: this.searchForm.get('adults').value
      };
      this.noOfWay = 2;
      this.returnComponent = this.loadComponent(1, retSchedule);
      this.returnComponent.instance.sel.subscribe(data => {
        this.returnFlight = data;
      });
    }
  }

  loadComponent(index: number, flightSearch: FlightSearchDTO): ComponentRef<FlightOnewayScheduleComponent> {
    // clear component
    this.entry.toArray()[index].viewContainer.clear();
    const resolver = this.resolver.resolveComponentFactory(FlightOnewayScheduleComponent);

    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolver);
    componentRef.instance.flightSearch = flightSearch;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  changeWay($event) {
    if ($event.target.value === '') {
      this.retDate.disable();
    } else {
      this.retDate.enable();
    }
  }


  get departure() {
    return this.searchForm.get('departure');
  }

  get arrival() {
    return this.searchForm.get('arrival');
  }
  get depDate() {
    return this.searchForm.get('depDate');
  }

  get retDate() {
    return this.searchForm.get('retDate');
  }

  get isRoundTrip() {
    return this.searchForm.get('isRoundTrip');
  }

  get selectedDep() {
    if (this.departureFlight == null) {
      return false;
    }
    return true;
  }

  get selectedRet() {
    if (this.noOfWay === 1) {
      return true;
    }
    if (this.returnFlight == null) {
      return false;
    }
    return true;
  }

}
