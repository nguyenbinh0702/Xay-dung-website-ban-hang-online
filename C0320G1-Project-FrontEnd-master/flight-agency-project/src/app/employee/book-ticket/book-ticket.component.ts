import { EmployeeService } from './../../shared/services/employee.service';
import { EmployeeFlightSearchDTO } from './../../shared/models/dto/employeeFlightSearchDTO';
//Creator:Nguyễn Xuân Hùng
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  flight = {} as EmployeeFlightSearchDTO;
  ticketForm: FormGroup;
  
  

  constructor(private router: Router,
              private employeeService: EmployeeService) {
    this.flight = this.router.getCurrentNavigation().extras.state as EmployeeFlightSearchDTO;
   }

  ngOnInit() {
    this.ticketForm = new FormGroup({
      flightDetails : new FormGroup({
        DeptFlightSchedule : new FormControl(null,Validators.required),
        arvFlightSchedule : new FormControl(null)
      }),
      adultPassengers : new FormArray(this.returnAdultFormGroupList()),
      childPassengers : new FormArray(this.returnChildFormGroupList()),
      otherDetails: new FormGroup({
        emailCheck: new FormControl(''),
        totalPrice: new FormControl(0)
      })
  })
  }

  //trả về list adult formgroup
  returnAdultFormGroupList(){
    let array = [];
    for(let i=0;i<this.flight.adult;i++){
      array.push(
        new FormGroup({
          fullName : new FormControl('',[Validators.required]),
          gender : new FormControl('',[Validators.required]),
          phoneNumber: new FormControl('',[Validators.pattern(/^[0-9]+$/)]),
          email: new FormControl('',[Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,2}$/)]),
          identifierCard: new FormControl('',[Validators.required]),
          deptLuggagePrice: new FormControl(0,[]),
          arvLuggagePrice: new FormControl(0,[])
        })
      )
    }
    return array;
  }

  //trả về list child formgroup
  returnChildFormGroupList(){
    let array = [];
    for(let i=0;i<this.flight.child;i++){
      array.push(
        new FormGroup({
          fullName : new FormControl('',[Validators.required]),
          gender : new FormControl('',[Validators.required]),
          phoneNumber: new FormControl('',[]),
          email: new FormControl('',[Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,2}$/)]),
          deptLuggagePrice: new FormControl(0,[]),
          arvLuggagePrice: new FormControl(0,[])
        })
      )
    }
    return array;
  }
}
