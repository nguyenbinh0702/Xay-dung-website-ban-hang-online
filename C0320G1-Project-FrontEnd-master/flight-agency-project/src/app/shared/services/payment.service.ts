import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly PAYMENT_API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  public getUnpaidTransaction(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.PAYMENT_API}/transaction/unpaid/${accountId}`);
  }

  public cancelTransaction(transactionId: number): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.PAYMENT_API}/transaction/${transactionId}/cancel`, null);
  }

  public payTransactions(transactionIds: number[], taxCode: string): Observable<Transaction[]> {
    const queryParams = `?taxCode=${taxCode}`;
    return this.http.patch<Transaction[]>(`${this.PAYMENT_API}/transaction/pay-list${queryParams}`, transactionIds);
  }

  public payTransaction(transactionId: number, taxCode: string): Observable<Transaction> {
    const queryParams = `?taxCode=${taxCode}`;
    return this.http.patch<Transaction>(`${this.PAYMENT_API}/transaction/${transactionId}/pay${queryParams}`, null);
  }

  public findReservation(reservationId: string, phone: string): Observable<Transaction> {
    const queryParams = `?id=${reservationId}&phone=${phone}`;
    return this.http.get<Transaction>(`${this.PAYMENT_API}/transaction/find-reservation${queryParams}`);
  }

  public getReservationDetails(reservationId: number): Observable<any> {
    return this.http.get<any>(`${this.PAYMENT_API}/transaction/${reservationId}/details`);
  }

}
