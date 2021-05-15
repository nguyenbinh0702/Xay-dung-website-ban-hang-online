import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
  private baseUrl = 'http://localhost:8080/api/v1/admin/tickets';
  private baseUrl2 = 'http://localhost:8080/api/v1/admin/tickets/BookingCode';
  private baseUrl3 = 'http://localhost:8080/api/v1/admin/tickets/Flight';

  constructor(private http: HttpClient) { }

  page(search, page): Observable<any> {
    return this.http.get(this.baseUrl + '?search=' + search + '&&page=' + page);
  }

  page2(search, page): Observable<any> {
    return this.http.get(this.baseUrl2 + '?search=' + search + '&&page=' + page);
  }

  page3(search, page): Observable<any> {
    return this.http.get(this.baseUrl3 + '?search=' + search + '&&page=' + page);
  }

  getTicket(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateTicket(id: any, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
