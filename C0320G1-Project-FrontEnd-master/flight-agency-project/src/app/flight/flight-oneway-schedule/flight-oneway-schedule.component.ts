import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightDetailComponent } from '../flight-detail/flight-detail.component';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { addDays } from 'date-fns';
import { FlightScheduleService } from 'src/app/shared/services/flight-schedule.service';
import { FlightSearchDTO } from 'src/app/shared/models/dto/flight-search-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-oneway-schedule',
  templateUrl: './flight-oneway-schedule.component.html',
  styleUrls: ['./flight-oneway-schedule.component.css']
})
export class FlightOnewayScheduleComponent implements OnInit, OnChanges, OnDestroy {

  @Input() flightSearch: FlightSearchDTO;
  @Output() sel = new EventEmitter<FlightSchedule>();

  // Constant
  readonly DAY_OF_WEEK = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  // display support properties
  branchImages: string[];
  isHidden = [];
  buttonChange = [];
  changeStyle = false;
  dateFlightString = new Array<string>(5);
  isActive = new Array<boolean>(5);

  // binding properties
  flightSchedules: FlightSchedule[] = [];
  dateFlight = new Array<Date>(5);
  dateString: string;
  depString: string;
  arrString: string;


  // Subcription
  private sub: Subscription[] = [];

  constructor(
    private flightScheduleService: FlightScheduleService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.searchFlightSchedule();
    this.branchImages = this.flightScheduleService.branchImages;
    this.setDate(this.flightSearch.depDate);
    this.changeFlightDate();
  }

  searchFlightSchedule() {
    this.sub[0] = this.flightScheduleService.search(this.flightSearch).subscribe(
      (data: FlightSchedule[]) => {
        this.flightSchedules = data;
        if (this.flightSchedules.length > 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.flightSchedules.length; i++) {
            this.isHidden.push(true);
            this.buttonChange.push('Chọn');
          }
          this.depString = `${this.flightSchedules[0].departureAirport.city}, Việt Nam (${this.flightSchedules[0].departureAirport.code}) `;
          this.arrString = `${this.flightSchedules[0].arrivalAirport.city}, Việt Nam (${this.flightSchedules[0].arrivalAirport.code}) `;
        }
      }
    );
  }
  ngOnDestroy() {
    this.sub.forEach(val => val.unsubscribe());
  }
  ngOnChanges() { }

  select(i) {
    if (this.buttonChange[i] === 'Chọn') {
      this.buttonChange[i] = 'Thay đổi';
      this.changeStyle = true;
      for (let index = 0; index < this.isHidden.length; index++) {
        if (index !== i) {
          this.isHidden[index] = false;
        }
      }
      this.sel.emit(this.flightSchedules[i]);
    } else {
      this.buttonChange[i] = 'Chọn';
      this.changeStyle = false;
      for (let index = 0; index < this.isHidden.length; index++) {
        this.isHidden[index] = true;
      }
      this.sel.emit(null);
    }
  }

  detail(i: number) {
    const modalRef = this.modalService.open(FlightDetailComponent, { size: 'lg' });
    modalRef.componentInstance.flightDetail = this.flightSchedules[i];
  }

  changeFlightDate(i: number = 0) {
    this.flightSearch.depDate = this.dateFlight[i];
    this.searchFlightSchedule();
    for (let j = 0; j < 5; j++) {
      if (j === i) {
        this.isActive[j] = true;
      } else {
        this.isActive[j] = false;
      }
    }
  }

  // tslint:disable-next-line:variable-name
  setDate(_date: Date) {
    for (let i = 0; i < this.dateFlight.length; i++) {
      const temp = addDays(new Date(_date), i);
      this.dateFlight[i] = temp;
      this.dateFlightString[i] = `${this.DAY_OF_WEEK[temp.getDay()]}(${temp.getDate()}/${temp.getMonth() + 1})`;
    }
  }
}
