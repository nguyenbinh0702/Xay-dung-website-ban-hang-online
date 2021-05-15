import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { checkEmail } from 'src/app/shared/validations/validation';
import { CheckPhoneNumber } from './../../shared/validations/validation';
import { PASSENGERS_ERRORS } from './../../shared/validations/error-message';
import { PassengerInfoDTO } from './../../shared/models/passenger';

@Component({
  selector: 'app-flight-personal-form',
  templateUrl: './flight-personal-form.component.html',
  styleUrls: ['./flight-personal-form.component.css']
})
export class FlightPersonalFormComponent implements OnInit {

  @Input() person: string;
  @Output() infomation = new EventEmitter<PassengerInfoDTO>();
  personInfoForm: FormGroup;
  errors = PASSENGERS_ERRORS;
  private tempInfo: PassengerInfoDTO;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.personInfoForm = this.createForm(this.person);
    this.personInfoForm.valueChanges.subscribe(control => {
      if (this.personInfoForm.valid) {
        this.tempInfo = control as PassengerInfoDTO;
      } else {
        this.tempInfo = null;
      }
      this.infomation.emit(this.tempInfo);
    })
  }

  createForm(person: string): FormGroup {
    const fg = this.fb.group({
      fullName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    }, { updateOn: 'blur' });
    switch (person) {
      case 'Người lớn':
        fg.addControl('identifierCard', this.setIdCard());
      case 'Trẻ em':
        fg.addControl('email', this.setEmail());
        fg.addControl('phoneNumber', this.setPhoneNumber());
        fg.addControl('baggagePrice', this.setBaggagePrice());
      default:
    }
    return fg;
  }

  setFullName(): FormControl {
    return this.fb.control('', [Validators.required, Validators.pattern(/^[ a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/)]);
  }

  setGender(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  setEmail(): FormControl {
    return this.fb.control('', [Validators.required, checkEmail]);
  }

  setPhoneNumber(): FormControl {
    return this.fb.control('', [Validators.required, CheckPhoneNumber]);
  }

  setIdCard(): FormControl {
    return this.fb.control('', [Validators.required, Validators.pattern(/(^[0-9]{9}$)|(^[0-9]{12}$)/)]);
  }

  setBaggagePrice(): FormControl {
    return this.fb.control(0, [Validators.required]);
  }
  get fullName() {
    return this.personInfoForm.get('fullName');
  }
  get gender() {
    return this.personInfoForm.get('gender');
  }
  get idCard() {
    return this.personInfoForm.get('identifierCard');
  }
  get email() {
    return this.personInfoForm.get('email');
  }
  get phoneNumber() {
    return this.personInfoForm.get('phoneNumber');
  }
  get baggage() {
    return this.personInfoForm.get('baggagePrice');
  }
}
