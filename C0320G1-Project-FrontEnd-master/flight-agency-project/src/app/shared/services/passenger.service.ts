import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PassengerDto} from "../models/dto/PassengerDto";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private readonly API_URL_USER = 'http://localhost:8080/api/v1/passenger/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


validateBirthday(c: AbstractControl) {
  var chooseDate = new Date(c.value).getTime();
  var currentDate = new Date().getTime();
  return (chooseDate - currentDate >= 0) ?
    { chooseDateGreaterThanCurrentDate: true } : null;
}

  addPassenger(passengerDto: PassengerDto): Observable <any> {
    return this.http.post(this.API_URL_USER + 'add', passengerDto);
  }

  getPassengerById(id): Observable<PassengerDto> {
    return this.http.get<PassengerDto>(this.API_URL_USER + id, this.httpOptions);
  }

  updatePassenger(passengerDto: PassengerDto, id: number): Observable<PassengerDto> {
    console.log(passengerDto);
    return this.http.put<PassengerDto>(this.API_URL_USER + 'update/' + id, JSON.stringify(passengerDto), this.httpOptions);
  }

  getAllPassenger(): Observable<any> {
    return this.http.get(this.API_URL_USER);
  }
}
