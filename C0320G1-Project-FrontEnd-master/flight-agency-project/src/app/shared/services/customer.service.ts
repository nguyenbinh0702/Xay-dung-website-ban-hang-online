import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerUpdateDto } from '../models/dto/CustomerUpdateDto';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { CustomerChangePassDto } from '../models/dto/CustomerChangePassDto';
import { TransactionDetailDTO } from '../models/dto/TransactionDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL_CUSTOMER = 'http://localhost:8080/api/v1/customer/';
  private readonly baseUrl = 'http://localhost:8080/api/v1/checkin';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Thành Long
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    responseType: 'text' as 'json'
  };

  // Thành Long
  getTransactionDetailHttpOptions(id: number): Object {
    const transactionDetail = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      params: {
        id
      }
    };
    return transactionDetail;
  }


  // Created By Thiện
  getCustomerById(id): Observable<CustomerUpdateDto> {
    return this.http.get<CustomerUpdateDto>(this.API_URL_CUSTOMER + id, this.httpOptions);
  }

  // Created By Thiện
  updateCustomer(customer: CustomerUpdateDto, id): Observable<CustomerUpdateDto> {
    return this.http.put<CustomerUpdateDto>(this.API_URL_CUSTOMER + 'update/' + id, JSON.stringify(customer), this.httpOptions);
  }

  // Created By Thiện
  updatePassword(customer: CustomerChangePassDto, id): Observable<CustomerChangePassDto> {
    return this.http.put<CustomerChangePassDto>(this.API_URL_CUSTOMER + 'changepass/' + id, JSON.stringify(customer), this.httpOptions);
  }

  // Created By Thiện - validate xác nhận mật khẩu
  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword !== v.confirmPassword) ? {
      passwordnotmatch: true
    } : null;
  }
  validateBirthday(c: AbstractControl) {
    const chooseDate = new Date(c.value).getTime();
    const currentDate = new Date().getTime();
    return (chooseDate - currentDate >= 0) ?
      { chooseDateGreaterThanCurrentDate: true } : null;
  }
  checkAge: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const birthday = new Date(control.value);
    const timeBirth: number = birthday.getTime();
    const now = new Date().getTime();
    if (((now - timeBirth) / 365.25 / 24 / 60 / 60 / 1000) < 18) {
      return {checkAge: true};
    }
    return null;
  }
  validPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const phoneRegex = /^0[35789]\d{8}$/;
    const characterRegex = /^[^\d]+$/;
    // tslint:disable-next-line:variable-name
    const _phoneNumber: string = control.value;
    if (_phoneNumber === '') {
      return null;
    }
    if (characterRegex.test(_phoneNumber)) {
      return {alphabel: true};
    }
    if (!phoneRegex.test(_phoneNumber)) {
      return {format: true};
    }
    return null;
  }


  // Thành Long
  searchTransactionDetail(id: number): Observable<TransactionDetailDTO[]> {
    return this.http.get<TransactionDetailDTO[]>(`${this.baseUrl}`, this.getTransactionDetailHttpOptions(id));
  }

  // Thành Long
  checkinPassenger(idPassenger: number[]): any {
    const data = { ids: idPassenger };
    return this.http.put<any>(`${this.baseUrl}/checkin-list`, data, this.options);
  }
}
