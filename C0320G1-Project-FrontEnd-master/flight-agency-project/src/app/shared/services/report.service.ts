import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
// Thành
  private readonly API_URL = 'http://localhost:8080/api/v1/admin/';
  constructor(private http: HttpClient) { }

  getAllReport(report: any): Observable<any> {
    return this.http.post(`${this.API_URL}` + 'pricereport', report);
  }
  getAllAirline(report: any): Observable<any> {
    return this.http.post(`${this.API_URL}` + 'airlinereport', report);
  }
}
