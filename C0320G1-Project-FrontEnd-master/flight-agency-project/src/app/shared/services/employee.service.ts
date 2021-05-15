import { EmployeeFlightSearchDTO } from '../models/dto/employeeFlightSearchDTO';
import { Transaction } from './../models/transaction';
import { TransactionPassengerDTO } from '../models/dto/transaction-passengerDTO';
import { FlightSchedule } from './../models/flight-schedule';
import { Airport } from './../models/airport';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../models/dto/page';
import { AbstractControl } from '@angular/forms';
import { ɵNullViewportScroller } from '@angular/common';
import { CustomerSearchDto } from '../models/dto/CustomerSearchDto';
import { CustomerCheckinDto } from '../models/dto/CustomerCheckinDto';
import {EmployeeDTO, employeeDto} from '../models/dto/employeeDto';





@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //BHung api url employee
  private readonly API_URL = "http://localhost:8080/api/v1/employee";
  private readonly URL = "http://localhost:8080/api/v1/employeeAPI";
  private readonly API_URL_EMPLOYEE = 'http://localhost:8080/api/v1/employee/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  //BHung get page filghtSchedule
  getFlightScheduleHttpOptions(page: number): Object {
    const flightSchedule = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        page
      }
    };
    return flightSchedule;
  }

  // Thành Long
  getPassengerCheckinHttpOptions(searchField: CustomerSearchDto, page: number): Object {
    const passenger = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      params: {
        fullName: searchField.fullName,
        address: searchField.address,
        page
      }
    };
    return passenger;
  }

  constructor(private http: HttpClient) {
  }

  // Hung: Lấy danh sách airport,
  getAllAirports(): Observable<any> {
    return this.http.get(this.API_URL + "/airport", this.httpOptions);
  }

  // Duc: lấy danh sách nhân viên
  getAllEmployee(page, size): Observable<any> {
    const link = this.URL + '?page=' + page + '&size=' + size;
    return this.http.get(link);
  }

  // Duc: tìm kiếm và trả về có phân trang
  searchEmployees(key, value, page, size): Observable<any> {
    const link = this.URL + '/search?key=' + key + '&value=' + value + '&page=' + page + '&size=' + size;
    return this.http.get(link);
  }


  //BHung: tìm kiếm danh sách flights:
  findAllFlightSchedules(flightDTO: EmployeeFlightSearchDTO, page: number): Observable<Page<FlightSchedule>> {
    return this.http.post<Page<FlightSchedule>>(this.API_URL + "/flightSchedule", JSON.stringify(flightDTO), this.getFlightScheduleHttpOptions(page))
  };

  //BHung tìm kiếm flight theo id:
  findFlightById(id: number): Observable<FlightSchedule> {
    return this.http.get<FlightSchedule>(this.API_URL + "/flightSchedule/" + id);
  }

  //BHung check email
  checkAccountByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.API_URL + "/checkEmail", {
      params: {
        email: email
      }
    });
  }

  //BHung luu ticket
  saveTransactionAndPassenger(transpass: TransactionPassengerDTO): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.API_URL + "/transPass/save", JSON.stringify(transpass), this.httpOptions);
  }

  //BHung tim transaction
  findTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.API_URL + "/transaction/" + id);
  }

  //BHung validate date
  validateGreaterThanCurrentDate(c: AbstractControl) {
    var chooseDate = Date.parse(c.value);
    var currentDate = Date.parse(new Date().toISOString().slice(0, 10));
    return (chooseDate - currentDate < 0) ?
      { chooseDateGreaterThanCurrentDate: true } : null;
  }
  validateArvDateGreaterThanDeptDate(c: AbstractControl) {
    const v = c.value;
    return (Date.parse(v.arrivalDate) - Date.parse(v.departureDate) < 0) ?
      { chooseArvDateSmallerThanDeptDate: true } : null;
  }
  // Thành Long
  getAllPassengerCheckin(searchField: CustomerSearchDto, page: number): Observable<Page<CustomerCheckinDto>> {
    return this.http.get<Page<CustomerCheckinDto>>(`${this.API_URL}/customer-checkin-list`, this.getPassengerCheckinHttpOptions(searchField, page));


  }
  // Duc: thêm mới nhân viên
  addNewEmployees(employees): Observable<any> {
    const link = this.URL;
    return this.http.post(link, employees);
  }

  // creator: Mậu
  getEmployeeById(id): Observable<employeeDto> {
    return this.http.get<employeeDto>(this.API_URL_EMPLOYEE + id, this.httpOptions);
  }

  // creator: Mậu
  changePassword(employee: employeeDto, id): Observable<employeeDto> {
    return this.http.put<employeeDto>(this.API_URL_EMPLOYEE + 'changePassword/' + id, JSON.stringify(employee), this.httpOptions);
  }

  getEmployeeEditById(id: number): Observable<EmployeeDTO> {
    // @ts-ignore
    return this.http.get(this.API_URL_EMPLOYEE + 'edit-employee/' + id, this.httpOptions);
  }

  update(employeeEditDto: EmployeeDTO, id: number): Observable<any> {
    return this.http.put<EmployeeDTO>(this.API_URL_EMPLOYEE + 'edit-in-list/' + id, JSON.stringify(employeeEditDto), this.httpOptions);
  }

  deleteEmployee(id): Observable<any> {
    return this.http.put(this.API_URL_EMPLOYEE + 'delete-in-list/' + id, this.httpOptions);
  }

}
