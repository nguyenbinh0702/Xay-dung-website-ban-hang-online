import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { FlightScheduleService } from 'src/app/shared/services/flight-schedule.service';
import { differenceInHours, differenceInMinutes } from 'date-fns'

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  @Input() flightDetail: FlightSchedule;
  branchImages: string[];
  interval: string;
  constructor(
    private flightScheduleService: FlightScheduleService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.branchImages = this.flightScheduleService.branchImages;
    this.getInterval();
  }

  getInterval() {

    let hours = differenceInHours(
      new Date(this.flightDetail.arrivalDateTime),
      new Date(this.flightDetail.departureDateTime)
    );
    let minutes = differenceInMinutes(
      new Date(this.flightDetail.arrivalDateTime),
      new Date(this.flightDetail.departureDateTime)
    );
    minutes = minutes % 60;
    if (minutes != 0)
      this.interval = `${hours}h ${minutes}ph`;
    else
      this.interval = `${hours}h`;
  }

}
