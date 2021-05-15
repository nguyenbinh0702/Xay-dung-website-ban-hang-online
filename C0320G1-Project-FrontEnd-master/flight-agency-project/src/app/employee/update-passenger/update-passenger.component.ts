import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PassengerDto} from "../../shared/models/dto/PassengerDto";
import {ActivatedRoute, Router} from "@angular/router";
import {PassengerService} from "../../shared/services/passenger.service";

@Component({
  selector: 'app-update-passenger',
  templateUrl: './update-passenger.component.html',
  styleUrls: ['./update-passenger.component.css']
})
export class UpdatePassengerComponent implements OnInit {
  public passengerUpdateForm: FormGroup;
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
    private passengerService: PassengerService,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.passengerUpdateForm = this.formBuilder.group({
      fullName: ['', [Validators.required, validateWhitespace, validateSpecialCharacters, Validators.maxLength(255)]],
      birthDate: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/), this.passengerService.validateBirthday]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,2}$/)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(20)]],
      identifierCard: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(6), Validators.maxLength(20)]],
    })

    this.passengerDto.id = this.activatedRoute.snapshot.params.id;
    this.passengerService.getPassengerById(this.passengerDto.id).subscribe(data => {
      this.passengerUpdateForm.patchValue(data);
    });

  }

  updatePassenger() {
    this.passengerService.updatePassenger(this.passengerUpdateForm.value, this.passengerDto.id).subscribe(data => {

      this.router.navigateByUrl('/employee/list-passenger')
    })
  }

  cancel() {
    this.router.navigateByUrl('/employee/list-passenger');
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
