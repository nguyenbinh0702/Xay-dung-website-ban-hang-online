import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {EmployeeService} from '../../shared/services/employee.service';
import {employeeDto} from '../../shared/models/dto/employeeDto';
import {validation} from '../../shared/validations/validation';
import {TokenStorageService} from '../../shared/services/token-storage.service';
declare var $: any;

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css']
})
export class EmployeeInformationComponent implements OnInit {
  infoForm: FormGroup;
  employee: employeeDto = {
    id: null,
    fullName: null,
    email: null,
    birthDate: null,
    phoneNumber: null,
    gender: null,
    address: null,
    avatarUrl: null,
    password: null,
    newPassword: null,
    confirmPassword: null,
    backendMessage: null
  };
  backendMessages: string[];
  message = '';
  errorMessage = '';
  private avatarUrl = '';
  changePassForm: FormGroup;
  errors = validation;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.changePassForm = this.fb.group({
      password: ['', [Validators.required]],
      // tslint:disable-next-line:max-line-length
      newPassword: ['', [Validators.required, Validators.pattern(/^[ A-Za-z0-9]*$/), Validators.minLength(8), Validators.maxLength(16), validateWhitespace]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: checkPassword});
    this.infoForm = this.fb.group({
      fullName: [''],
      email: [''],
      birthday: [''],
      phoneNumber: [''],
      gender: [''],
      address: [''],
      avatarUrl: [''],
    });
    this.employee.id = this.tokenStorageService.getJwtResponse().accountId;
    this.employeeService.getEmployeeById(this.employee.id).subscribe(data => {
      this.avatarUrl = data.avatarUrl;
      if (this.avatarUrl == null || data.avatarUrl === '') {
        if (data.gender === 'nam' || data.gender === 'Nam') {
          this.avatarUrl = 'https://www.w3schools.com/howto/img_avatar.png';
        } else {
          this.avatarUrl = 'https://www.w3schools.com/w3images/avatar6.png';
        }
      }
      this.infoForm.patchValue(data);
    }, error => {
      this.errorMessage = 'Lỗi!! Không tìm thấy tài khoản của bạn';
    });
  }

  changePassword() {
    this.errorMessage = '';
    this.message = '';
    // this.employee = this.infoForm.value;
    this.employee.password = this.changePassForm.get('password').value;
    this.employee.newPassword = this.changePassForm.get('newPassword').value;
    this.employee.confirmPassword = this.changePassForm.get('confirmPassword').value;
    this.employee.id = this.tokenStorageService.getJwtResponse().accountId;
    this.employeeService.changePassword(this.employee, this.tokenStorageService.getJwtResponse().accountId).subscribe(data => {
      this.backendMessages = data.backendMessage;
    }, error => {
      this.errorMessage = 'Cập nhật tài khoản thất bại';
    }, () => {
      if (this.backendMessages.length === 0) {
        this.message = 'Đổi mật khẩu thành công !!!';
        $('#basicModal').modal('hide');
      }
      this.saveTodos();
      this.ngOnInit();
    });
  }
  noClosedModal(): void {
    $('#basicModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  get password() {
    return this.changePassForm.get('password');
  }

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  saveTodos(): void {
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      document.getElementById('message').style.display = 'none';
    }, 3000);
  }

}

function checkPassword(formGroup: AbstractControl): ValidationErrors | null {
  const pass: employeeDto = formGroup.value;
  const password = pass.newPassword;
  const confirmPassword = pass.confirmPassword;
  if (password !== confirmPassword) {
    return {checkPassword: true};
  }
  return null;
}

function validateWhitespace(c: AbstractControl) {
  if (c.value !== '') {
    const isWhitespace = c.value.trim().length === 0;
    if (isWhitespace) {
      const isValid = !isWhitespace;
      return isValid ? null : {whitespace: true};
    }
  }
}
