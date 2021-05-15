import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback';
import {FlightSchedule} from '../models/flight-schedule';
import {FlightSearchDTO} from '../models/dto/flight-search-dto';
import {Airport} from "../models/airport";

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  public urlAPI = 'http://localhost:8080/api/v1/employee/promotion';

  private base_url = 'http://localhost:8080/api/v1/promotion';
  // tslint:disable-next-line:variable-name
  private base1_url = 'http://localhost:8080/api/v1/flight-promotion';
  // tslint:disable-next-line:variable-name
  private airport_url = 'http://localhost:8080/api/v1/airport';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    public http: HttpClient
  ) { }


  getTransactionDetailHttpOptions(departureAirport: string): Object {
    const promo = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      params: {
        departureAirport
      }
    };
    return promo;
  }

  getAllFlightPromo(departureDateTime: string): Observable<FlightSchedule[]> {
    return this.http.get<FlightSchedule[]>(`${this.base_url}`, this.getTransactionDetailHttpOptions(departureDateTime));
  }
  searchFlightPromo(flightSearch: FlightSearchDTO): Observable<FlightSchedule[]> {
  return this.http.post<FlightSchedule[]>(`${this.base1_url}`, flightSearch );
}
  getAllairport(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.airport_url}`);

  }
  //Tùng
  getPromoById(id: number): Observable<any> {
    return this.http.get(`${this.urlAPI}/promo-edit/${id}`, this.httpOptions);
  }

  //Tùng
  updatePromo(id: number, value: any): Observable<any> {
    debugger
    return this.http.put(`${this.urlAPI}/update-edit/${id}`, JSON.stringify(value), this.httpOptions);
  }


  //Tùng
  deletePromo(idDelete: number): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}/promo-delete/${idDelete}`, this.httpOptions);
  }
  getAirlines(): Observable<any> {
    return this.http.get(this.urlAPI + `/airline`, this.httpOptions);
  }

  getAirports(): Observable<any> {
    return this.http.get(this.urlAPI + `/airport`, this.httpOptions);
  }

  getPromo(status: string, page: number): Observable<any> {
    return this.http.get(this.urlAPI + `?page=${page}&status=${status}`, this.httpOptions);
  }

  createPromo(promo: any): any {
    return this.http.post<any>(this.urlAPI + `/create`, promo, this.options);
  }

  searchPromo(infoSearch, page: number): Observable<any> {
    return this.http.post<any>(this.urlAPI + `/search?page=${page}`, JSON.stringify(infoSearch), this.options);
  }

  convertDate(date: string): string {
    return (date + 'T00:00:00');
  }

}
