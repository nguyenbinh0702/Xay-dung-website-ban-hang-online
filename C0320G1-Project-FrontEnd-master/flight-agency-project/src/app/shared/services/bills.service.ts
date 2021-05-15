import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { Page } from './../models/page';
import { BillSearchFields } from '../models/billSearchField';


@Injectable({
  providedIn: 'root'
})
export class BillService {

  // Son
  ApiBill = "http://localhost:8080/api/v1/bills-list";
  url = "http://localhost:8080/api/v1/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBillsList(): Observable<Page<Bill>> {
    return this.http.get<Page<Bill>>(this.ApiBill)
  }

  getBillsListSearch(searchField: BillSearchFields, page: number): Observable<Page<Bill>> {

    return this.http.get<Page<Bill>>(`${this.url}/bill-search?billCode=${searchField.billCode}&billTax=${searchField.billTax}&name=${searchField.name}`);
  }


}



