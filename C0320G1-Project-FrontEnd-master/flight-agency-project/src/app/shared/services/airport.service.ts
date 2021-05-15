import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from '../models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private readonly API_URL = 'http://localhost:8080/api/v1'
  constructor(
    private http: HttpClient
  ) { }


  // Creator: Duy
  // Get all airport in VN
  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.API_URL}/airport`);
  }
}
