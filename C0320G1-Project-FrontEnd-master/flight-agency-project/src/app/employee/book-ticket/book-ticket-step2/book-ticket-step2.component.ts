//Creator: Nguyễn Xuân Hùng
import { DataService } from './../../../shared/services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TransactionPassengerDTO } from '../../../shared/models/dto/transaction-passengerDTO';
import { EmployeePassengerDTO } from '../../../shared/models/dto/employeePassengerDTO';
import { EmployeeTransactionDTO } from '../../../shared/models/dto/employeeTransactionDTO';
import { Account } from './../../../shared/models/account';
import { EmployeeService } from './../../../shared/services/employee.service';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { EmployeeFlightSearchDTO } from '../../../shared/models/dto/employeeFlightSearchDTO';
import { Transaction } from 'src/app/shared/models/transaction';

declare let $: any;
declare let Email: any;

@Component({
  selector: 'app-book-ticket-step2',
  templateUrl: './book-ticket-step2.component.html',
  styleUrls: ['./book-ticket-step2.component.css']
})
export class BookTicketStep2Component implements OnInit {

  @Input() flight = {} as EmployeeFlightSearchDTO;
  //Nhận biến flightID
  flightIds: number[];
  @Input() ticketForm: FormGroup;
  departureFlight = {} as FlightSchedule;
  arrivalFlight = {} as FlightSchedule;
  customer = {} as Account;
  emailCheck: string = "";
  totalPrice: number = 0;
  transactionPassengerDTO = {} as TransactionPassengerDTO;
  passengers = [] as EmployeePassengerDTO[];
  transactions = [] as EmployeeTransactionDTO[];
  deptTransaction = {} as EmployeeTransactionDTO;
  arvTransaction = {} as EmployeeTransactionDTO;
  saveTransactions = [] as Transaction[];
  //Khai báo formArray
  childPassengers: FormArray;
  adultPassengers: FormArray;
  check : Boolean = false;
  deptPrice: number = 0;
  arvPrice: number = 0;

  constructor(private data:DataService,
              private employeeService:EmployeeService,
              private router:Router) { }

  ngOnInit() {
    this.childPassengers = this.ticketForm.get('childPassengers') as FormArray;
    this.adultPassengers = this.ticketForm.get('adultPassengers') as FormArray;
    this.data.currentMessage.subscribe(data=>{
      this.flightIds=data;
      if(this.flightIds.length!=0){
        this.employeeService.findFlightById(this.flightIds[0]).subscribe(data=>{
          this.departureFlight=data;
           this.deptPrice = this.departureFlight.price*(this.flight.adult+this.flight.child*1)+(this.departureFlight.price*(this.flight.adult*1+this.flight.child*1*1))*10/100;
           let luggagePrice = this.getTotalArvLuggagePrice()+this.getTotalDeptLuggagePrice();
            this.totalPrice= this.deptPrice+luggagePrice; 
           if(this.flightIds.length!=1){
            this.employeeService.findFlightById(this.flightIds[1]).subscribe(data=>{
              this.arrivalFlight = data;
              this.arvPrice= this.arrivalFlight.price*(this.flight.adult+this.flight.child*1)+(this.arrivalFlight.price*(this.flight.adult*1+this.flight.child*1*1))*10/100;
              let luggagePrice = this.getTotalArvLuggagePrice()+this.getTotalDeptLuggagePrice();
              this.totalPrice= this.deptPrice+this.arvPrice+luggagePrice;
            })
           
          }
          
        })
      }
    })
   
}

  //lặp số lượng
  counter(i: number) {
    return new Array(i);
  }

  //Hàm kiểm tra email
  checkEmail() {
    this.emailCheck = ""
    this.emailCheck = this.ticketForm.get('otherDetails').get('emailCheck').value;
    this.employeeService.checkAccountByEmail(this.emailCheck).subscribe(data => {
      this.customer = data;
      this.emailCheck = "Email hợp lệ";
    }, error => {
      this.emailCheck = "Không tìm thấy người dùng";
    })
  }

  //Cập nhật tổng tiền hành lý chiều đi
  getTotalDeptLuggagePrice(): number {
    let luggagePrice = 0;
    let adultPassengers = this.ticketForm.get("adultPassengers") as FormArray;
    let childPassengers = this.ticketForm.get("childPassengers") as FormArray;
    for (let i = 0; i < this.flight.adult; i++) {
      luggagePrice += adultPassengers.at(i).get('deptLuggagePrice').value * 1;
    }
    for (let i = 0; i < this.flight.child; i++) {
      luggagePrice += childPassengers.at(i).get('deptLuggagePrice').value * 1;
    }
    return luggagePrice;
  }

  //Cập nhật tổng tiền hành lý chiều về
  getTotalArvLuggagePrice(): number {
    let luggagePrice = 0;
    let adultPassengers = this.ticketForm.get("adultPassengers") as FormArray;
    let childPassengers = this.ticketForm.get("childPassengers") as FormArray;
    for (let i = 0; i < this.flight.adult; i++) {
      luggagePrice += adultPassengers.at(i).get('arvLuggagePrice').value * 1;
    }
    for (let i = 0; i < this.flight.child; i++) {
      luggagePrice += childPassengers.at(i).get('arvLuggagePrice').value * 1;
    }
    return luggagePrice;
  }

  changeLuggage(){
        let luggagePrice = this.getTotalArvLuggagePrice()+this.getTotalDeptLuggagePrice();
        this.totalPrice=this.arvPrice+this.deptPrice+luggagePrice;
  }
  //Lưu vé
  saveTicket(){
    this.passengers = [];
    this.transactions = [];
    //Lưu khách hàng
    let passenger = {} as EmployeePassengerDTO;
    let adultPassengers = this.ticketForm.get("adultPassengers") as FormArray;
    let childPassengers = this.ticketForm.get("childPassengers") as FormArray;
    for (let i = 0; i < this.flight.adult; i++) {
      passenger = {
        id: null,
        fullName: adultPassengers.at(i).get("fullName").value,
        identifierCard: adultPassengers.at(i).get("identifierCard").value,
        email: adultPassengers.at(i).get("email").value,
        phoneNumber: adultPassengers.at(i).get("phoneNumber").value,
        gender: adultPassengers.at(i).get("gender").value,
        checkin: false,
        deptLuggagePrice: adultPassengers.at(i).get("deptLuggagePrice").value,
        arvLuggagePrice: adultPassengers.at(i).get("arvLuggagePrice").value
      }
      this.passengers.push(passenger);
    }

    for (let i = 0; i < this.flight.child; i++) {
      passenger = {
        id: null,
        fullName: childPassengers.at(i).get("fullName").value,
        identifierCard: null,
        email: null,
        phoneNumber: childPassengers.at(i).get("phoneNumber").value,
        gender: childPassengers.at(i).get("gender").value,
        checkin: false,
        deptLuggagePrice: childPassengers.at(i).get("deptLuggagePrice").value,
        arvLuggagePrice: childPassengers.at(i).get("arvLuggagePrice").value
      }
      this.passengers.push(passenger);
    }

    //Lưu transaction
    //Chiều đi
    let createdTime = new DatePipe('vi-VN').transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", 'GMT+7');
    let due = new Date();
    due.setMinutes(due.getMinutes()+15); 
    let dueTime = new DatePipe('vi-VN').transform(due, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", 'GMT+7');
    this.deptTransaction = {
      id: null,
      createdTime: createdTime,
      dueTime: dueTime,
      price: this.arrivalFlight?this.deptPrice+this.getTotalDeptLuggagePrice() : this.totalPrice,
      status: "Chờ thanh toán",
      account: this.customer as Account,
      flightSchedule: this.departureFlight,
    }
    this.transactions.push(this.deptTransaction);

    //Lưu chiều về
    if (this.flightIds.length != 1) {
      this.arvTransaction = {
        id: null,
        createdTime: createdTime,
        dueTime: dueTime,
        price: this.arvPrice + this.getTotalArvLuggagePrice(),
        status: "Chờ thanh toán",
        account: this.customer as Account,
        flightSchedule: this.arrivalFlight,
      }
      this.transactions.push(this.arvTransaction);
    }
    this.transactionPassengerDTO = {
      transactions: this.transactions,
      passengers: this.passengers
    }
    this.employeeService.saveTransactionAndPassenger(this.transactionPassengerDTO).subscribe(data => {
      this.saveTransactions = data;
      if (this.check == true) {        
        for(let tran of this.saveTransactions){
          window.open("/employee/transaction/invoice/"+ tran.id,"_blank");
        }
      }else{
        Email.send({
          SecureToken : "86fe9a3e-aa53-41b1-a6fa-dab6c48f9c95",
          To : this.saveTransactions[0].account.email,
          From : "hungupindn@gmail.com",
          Subject : "Vé máy bay C0320G1",
          Body : "<h3>Cảm ơn bạn đã đặt vé tại phòng vé C0320G1.</h3><div> Xin vui lòng đăng nhập website và thanh toán số tiền "+this.saveTransactions[0].price+" VND cho mã chuyến bay:"
          +this.saveTransactions[0].id +" Cảm ơn quý khách.</div>"
          }).then(
            $("#emailModal").modal("show")
            
          );
      } 
      setTimeout(function(){ window.location.href="/employee/findFlight"; },2000)
      
    })
  }

  //router
  goToInvoicePage() {
    this.check = true;
    this.saveTicket();
  }
}
