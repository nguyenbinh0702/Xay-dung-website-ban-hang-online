import { MatDialog } from '@angular/material';
import {Component, OnInit, QueryList, ViewChildren, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { FlightScheduleService } from '../shared/services/flight-schedule.service';
import { FlightSchedule } from '../shared/models/flight-schedule';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Airport } from '../shared/models/airport';
import { FlightSearchForm } from '../shared/models/dto/flight-search-form';
import { LoginComponent } from './login/login.component';
import { OnewayDirective } from '../flight/oneway.directive';
import { FlightOnewayScheduleComponent } from '../flight/flight-oneway-schedule/flight-oneway-schedule.component';
import {FlightSearchDTO} from '../shared/models/dto/flight-search-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChildren(OnewayDirective) entry: QueryList<OnewayDirective>;

  // D-Bach
  oneWay = false;
  flightSchedule: Observable<FlightSchedule[]>;
  searchForm: FormGroup;
  airportCity: Airport[];
  pageSize: number;
  currentPage: number;
  totalElements: number;
  arr: number[];
  branchImages: string[];
  isEmpty = false;
  departureComponent: ComponentRef<FlightOnewayScheduleComponent>;
  arrivalComponent: ComponentRef<FlightOnewayScheduleComponent>;
  departureFlight: FlightSchedule = null;
  arrivalFlight: FlightSchedule = null;

  constructor(
    private flightScheduleService: FlightScheduleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private resolve: ComponentFactoryResolver
  ) {
  }

  // D-Bach
  getPage(pageNumber: number) {
    this.flightSchedule = this.flightScheduleService.getAllFlightSchedule(pageNumber - 1).pipe(tap(page => {
      this.totalElements = page.totalElements;
      this.pageSize = page.size;
      this.currentPage = pageNumber;
      this.arr = [];
      const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
      const lastIndeex = this.pageSize * this.currentPage;
      for (let i = firstIndex; i <= lastIndeex; i++) {
        this.arr.push(i);
      }

      this.isEmpty = page.content.length === 0;
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    }),
      map(page => page), map(page => page.content)
    );
  }

  // D-Bach
  ngOnInit() {
    this.getPage(1);
    this.branchImages = this.flightScheduleService.branchImages;
    this.flightScheduleService.getAllAirportCity().subscribe(data => {
      this.airportCity = data;
    });
    this.searchForm = this.formBuilder.group({
      departureAirport: ['', [Validators.required]],
      arrivalAirport: ['', [Validators.required]],
      departureDateTime: [new Date(), [Validators.required]],
      arrivalDateTime: [new Date(), [Validators.required]],
      babies: [0, [Validators.required]],
      children: [0, [Validators.required]],
      adults: [1, [Validators.required]]
    }, {validators : [this.checkDepartureAirportAndArrivalAirport, this.checkAdultsAndBabies, this.checkAdultsAndChildren,
      this.checkSelectDepartureDate, this.checkSelectArrivalDate, this.checkDepartureDateAndArrivalDate]});
  }

  // D-Bach
  search() {
     const departureSchedule: FlightSearchDTO = {
       sortBy : '',
       departure : this.searchForm.get('departureAirport').value,
       arrival : this.searchForm.get('arrivalAirport').value,
       depDate : this.searchForm.get('departureDateTime').value,
       babies : this.searchForm.get('babies').value,
       children : this.searchForm.get('children').value,
       adults : this.searchForm.get('adults').value
     };
     this.departureComponent = this.loadComponent(0, departureSchedule);
     this.departureComponent.instance.sel.subscribe(data => {
       this.departureFlight = data;
     });
     if (!this.oneWay) {
       const arrivalSchedule: FlightSearchDTO = {
         sortBy : '',
         departure : this.searchForm.get('departureAirport').value,
         arrival : this.searchForm.get('arrivalAirport').value,
         depDate : this.searchForm.get('arrivalDateTime').value,
         babies : this.searchForm.get('babies').value,
         children : this.searchForm.get('children').value,
         adults : this.searchForm.get('adults').value
       };
       this.arrivalComponent = this.loadComponent(1, arrivalSchedule);
       this.arrivalComponent.instance.sel.subscribe(data => {
         this.arrivalFlight = data;
       });
     }
  }

  // D-Bach
  // @ts-ignore
  loadComponent(index: number, flightSearch: FlightSearchDTO): ComponentRef<FlightOnewayScheduleComponent> {
    this.entry.toArray()[index].viewContainer.clear();
    const resolve = this.resolve.resolveComponentFactory(FlightOnewayScheduleComponent);
    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolve);
    componentRef.instance.flightSearch = flightSearch;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  // D-Bach
  checkSelectDepartureDate(formGroup: AbstractControl): ValidationErrors | null {
    const select: FlightSearchForm = formGroup.value;
    const selectDate = Date.parse(select.departureDateTime);
    const currentDate = Date.parse(new Date().toISOString().slice(0, 10));
    return (selectDate - currentDate < 0) ?
      { chooseDateGreaterThanCurrentDate: true } : null;
  }

  // D-Bach
  checkSelectArrivalDate(formGroup: AbstractControl): ValidationErrors | null {
    const select: FlightSearchForm = formGroup.value;
    const selectDate = Date.parse(select.arrivalDateTime);
    const currentDate = Date.parse(new Date().toISOString().slice(0, 10));
    if (selectDate - currentDate < 0) {
      return { checkArrivalDate: true};
    }
    return null;
  }

  // D-Bach
  checkDepartureDateAndArrivalDate(formGroup: AbstractControl): ValidationErrors | null {
    const select: FlightSearchForm = formGroup.value;
    const departureDate = Date.parse(select.departureDateTime);
    const arrivalDate = Date.parse(select.arrivalDateTime);
    if (arrivalDate - departureDate < 0) {
      return { checkDepAndArrDate: true };
    }
    return null;
  }

  // D-Bach
  checkDepartureAirportAndArrivalAirport(formGroup: AbstractControl): ValidationErrors | null {
    const check: FlightSearchForm = formGroup.value;
    const departureAirport = check.departureAirport;
    const arrivalAirport = check.arrivalAirport;
    if (departureAirport === arrivalAirport && departureAirport !== '' && arrivalAirport !== '') {
      return {checkPlace: true};
    }
    return null;
  }

  // D-Bach
  checkAdultsAndBabies(formGroup: AbstractControl): ValidationErrors | null {
    const check: FlightSearchForm = formGroup.value;
    const adults = check.adults;
    const babies = check.babies;
    if (babies > adults) {
      return {checkBabies: true};
    }
    return null;
  }

  // D-Bach
  checkAdultsAndChildren(formGroup: AbstractControl): ValidationErrors | null {
    const check: FlightSearchForm = formGroup.value;
    const adults = check.adults;
    const children = check.children;
    console.log(adults);
    if ((+adults + +children) >= 9) {
      return {checkNumber: true};
    }
    return null;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '900px',
      height: '600px',
      data: {}
    });
  }
  // D-Bach
  sendData() {
    this.flightScheduleService.flightSearchForm = this.searchForm.value as FlightSearchForm;
    this.flightScheduleService.flightSearchForm.isRoundTrip = this.oneWay ? '' : '1';
    console.log(`vo day`);
    this.router.navigateByUrl('flight/schedule');
    console.log(`vo day1`);
  }

  // D-Bach
  oneWayPicked() {
    this.oneWay = true;
  }

  // D-Bach
  twoWayPicked() {
    this.oneWay = false;
  }

}
