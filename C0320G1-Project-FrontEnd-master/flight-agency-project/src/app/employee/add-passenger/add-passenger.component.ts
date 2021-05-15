import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PassengerService} from "../../shared/services/passenger.service";
import {PassengerDto} from "../../shared/models/dto/PassengerDto";

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  public passengerForm: FormGroup;
  private passengerDto: PassengerDto = {
    id: null,
    fullName: null,
    email: null,
    phoneNumber: null,
    address: null,
    birthDate: null,
    identifierCard: null,
    gender: null,
    // backendMessage: null
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passengerService: PassengerService
  ) {
  }

  ngOnInit() {
    this.passengerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, validateWhitespace, validateSpecialCharacters, Validators.maxLength(255)]],
      birthDate: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/), this.passengerService.validateBirthday]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,2}$/)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(20)]],
      identifierCard: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(6), Validators.maxLength(20)]],
    });

  }

  addPassenger() {
    this.passengerDto.fullName = this.passengerForm.get('fullName').value;
    this.passengerDto.birthDate = this.passengerForm.get('birthDate').value;
    this.passengerDto.gender = this.passengerForm.get('gender').value;
    this.passengerDto.email = this.passengerForm.get('email').value;
    this.passengerDto.address = this.passengerForm.get('address').value;
    this.passengerDto.phoneNumber = this.passengerForm.get('phoneNumber').value;
    this.passengerDto.identifierCard = this.passengerForm.get('identifierCard').value;
    this.passengerService.addPassenger(this.passengerDto).subscribe(data => {

      this.router.navigateByUrl('/employee/list-passenger');
    });
  }

  cancel() {
    this.router.navigateByUrl('/employee/list-passenger')
  }
}
  function validateWhitespace(c: AbstractControl) {
  if (c.value != '') {
    const isWhitespace = c.value.trim().length === 0;
    if (isWhitespace) {
      const isValid = !isWhitespace;
      return isValid ? null : {'whitespace': true};
    }
  }
}

  function validateSpecialCharacters(c: AbstractControl) {
  const pattern = /[$&+,:;=?@#|'<>.^*()%!-]+/;
  return (c.value.match(pattern)) ? {
    containSpecialCharacters: true
  } : null
}
