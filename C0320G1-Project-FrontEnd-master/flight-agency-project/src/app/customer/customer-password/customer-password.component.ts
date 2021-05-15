import { TokenStorageService } from './../../shared/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { CustomerChangePassDto } from '../../shared/models/dto/CustomerChangePassDto';
import { CustomerService } from '../../shared/services/customer.service';

function checkPassword(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('newPassword').value;
  const confirmPassword = formGroup.get('confirmPassword').value;
  if (password !== confirmPassword) {
    return { checkPassword: true };
  }
  return null;
}
@Component({
  selector: 'app-customer-password',
  templateUrl: './customer-password.component.html',
  styleUrls: ['./customer-password.component.css']
})

export class CustomerPasswordComponent implements OnInit {
  passwordForm: FormGroup;

  customer: CustomerChangePassDto = {
    id: null,
    password: null,
    newPassword: null,
    confirmPassword: null,
    backendMessage: null
  };

  backendMessages: string[];
  message = '';
  errorMessage = '';
  constructor(private fb: FormBuilder,
    private customerService: CustomerService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    // Created By Thiện -form đổi mật khẩu
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/)]],
      confirmPassword: [''],
    }, { validators: checkPassword });
  }
  // Created By Thiện - đổi mật khẩu
  updatePassword() {
    this.errorMessage = '';
    this.message = '';
    this.customer = this.passwordForm.value
    this.customer.id = this.tokenStorage.getJwtResponse().accountId;
    this.customerService.updatePassword(this.customer, this.customer.id).subscribe(data => {
      this.backendMessages = data.backendMessage;
    }, error => { this.errorMessage = 'Đổi mật khẩu thất bại'; }, () => {
      if (this.backendMessages.length === 0) {
        this.message = 'Đổi mật khẩu thành công';
      }
      this.ngOnInit();
    });
  }
}
