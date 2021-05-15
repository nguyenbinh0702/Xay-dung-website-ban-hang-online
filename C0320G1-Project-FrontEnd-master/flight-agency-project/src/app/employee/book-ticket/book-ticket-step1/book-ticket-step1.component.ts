import { Observable } from 'rxjs';
//Creator: Nguyễn Xuân Hùng
import { DataService } from './../../../shared/services/data.service';
import { EmployeeService } from './../../../shared/services/employee.service';
import { FlightSchedule } from './../../../shared/models/flight-schedule';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeFlightSearchDTO } from '../../../shared/models/dto/employeeFlightSearchDTO';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-book-ticket-step1',
  templateUrl: './book-ticket-step1.component.html',
  styleUrls: ['./book-ticket-step1.component.css']
})
export class BookTicketStep1Component implements OnInit {

  @Input() flight = {} as EmployeeFlightSearchDTO;

  flightIds : number[] = []; 
  backFlight = {} as EmployeeFlightSearchDTO;
  @Input() ticketForm: FormGroup;
  twoWay: boolean = null;
  departureDates = [];
  arrivalDates = [];
  departureFlights : Observable<FlightSchedule[]>;
  arrivalFlights : Observable<FlightSchedule[]>;
  //Biến xét active class
  isButtonDepartureClick : number =3;
  isButtonArrivalClick : number =3;
  //Biến check list null
  isDeptFlightNull: boolean = false;
  isArvFlightNull: boolean = false;
  //Biến hiển thị phân trang
  currentPage : number;
  pageSize : number;
  totalElements : number;
  arvCurrentPage : number;
  arvPageSize : number;
  arvTotalElements : number;

  constructor(private employeeService: EmployeeService,
    private dataService:DataService) {
   }

  ngOnInit() {
    if(this.arrivalDates.length==0||this.departureDates.length==0){
      if(this.flight.arrivalDate!=""&&this.flight.arrivalDate!=null){
        this.arrivalDates= this.getWeekDays(this.flight.arrivalDate);
      }
      this.departureDates = this.getWeekDays(this.flight.departureDate);
    }
    
    //Gửi danh sách flightIds
    this.dataService.currentMessage.subscribe(data=> this.flightIds=data);

    //Tìm kiếm danh sách chuyến bay đi:
    this.getDeptPage(1);
      //Tìm kiếm chiều trở về
      if(this.flight.arrivalDate!=""&&this.flight.arrivalDate!=null){
        // this.backFlight = this.flight;
        this.backFlight.departurePlace = this.flight.arrivalPlace;
        this.backFlight.arrivalPlace = this.flight.departurePlace;
        if(this.backFlight.departureDate==null){
          this.backFlight.departureDate = this.flight.arrivalDate;
        }
        this.getArvPage(1);
      }
  }

  //function lấy tên thứ
  getDayName(day:string):string {
    var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    var d = new Date(day);
    var dayName = days[d.getDay()];
    return dayName;
  }

  //function lấy 7 ngày
  getWeekDays(date: string): Date[]{
        var dates = [] as Date[];
        var i: number;
        var myDate =new Date(date);
        for(i=0;i<3;i++){
            var newDate = new Date(myDate.setDate(myDate.getDate()-1));
            dates.unshift(newDate);
        }
        myDate = new Date(date);
        dates.push(new Date(date));
        for(i=0;i<3;i++){
            var newDate = new Date(myDate.setDate(myDate.getDate()+1));
            dates.push(newDate);
        }
        return dates;
  }

  //function tìm kiếm chuyến bay đi khác theo ngày
  findDepartureFlightOfNewDate(day,index){
    this.isButtonDepartureClick = index;
    var newDate = new Date(day).toISOString().slice(0,10);
    this.flight.departureDate = newDate;
    this.ngOnInit();
  }

  //function tìm kiếm chuyến bay về theo ngày
  findArrivalFlightOfNewDate(day,index){
    this.isButtonArrivalClick = index;
    var newDate = new Date(day).toISOString().slice(0,10);
    this.backFlight.departureDate = newDate;
    this.ngOnInit();
  }

  //submit step1
  step1Submitted(){
    this.flightIds=[];
    this.flightIds.push(Number.parseInt(this.ticketForm.get('flightDetails').get('DeptFlightSchedule').value))
    if(this.flight.arrivalDate!=""&&this.flight.arrivalDate!=null){
      if(this.ticketForm.get('flightDetails').get('arvFlightSchedule').value){
        this.flightIds.push(Number.parseInt(this.ticketForm.get('flightDetails').get('arvFlightSchedule').value));
      }
    }
    this.dataService.changeData(this.flightIds);
    this.ticketForm.get('flightDetails').get('DeptFlightSchedule').markAsTouched();
    this.ticketForm.get('flightDetails').get('DeptFlightSchedule').updateValueAndValidity();
    this.ticketForm.get('flightDetails').get('arvFlightSchedule').markAsTouched();
    this.ticketForm.get('flightDetails').get('arvFlightSchedule').updateValueAndValidity();
  }

  changeImageBranch(id:number){
    let imageSrc = ""
    switch(id){
      case 1:
        imageSrc = "../../../assets/branches-image/vietjet.png";
        return imageSrc;
      case 2:
        imageSrc = "../../../assets/branches-image/pacific.png";
        return imageSrc;
      case 3:
        imageSrc = "../../../assets/branches-image/bamboo.png";
        return imageSrc;
      case 4:
        imageSrc = "../../../assets/branches-image/vnairline.gif";
        return imageSrc;
    }
  }
  getDeptPage(pageNumber: number){
    this.departureFlights = this.employeeService.findAllFlightSchedules(this.flight,pageNumber-1).pipe(
      tap(res=>{
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;
        this.isDeptFlightNull = false
        if(res.content.length==0){
          this.isDeptFlightNull = true;
        }
      }),
      map(res => res.content)
    );
  }
  getArvPage(pageNumber: number){
    this.arrivalFlights = this.employeeService.findAllFlightSchedules(this.backFlight,pageNumber-1).pipe(
      tap(res=>{
        this.arvTotalElements = res.totalElements;
        this.arvPageSize = res.size;
        this.arvCurrentPage = pageNumber;
        this.isArvFlightNull = false
        if(res.content.length==0){
          this.isArvFlightNull = true;
        }
      }),
      map(res => res.content)
    );
  }
}
