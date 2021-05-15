import { FormGroup } from '@angular/forms';
import { Page } from './../models/dto/Page';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from '../models/bill';
import { SelectDto } from '../models/dto/SelectDto';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  // C-Ngan
  getOptions(page?: number, billCode?: string, brand?: string, departure?: string, arrival?: string): Object {
    let options = {
      headers : this.httpOptions.headers,
      params : {
        page: page,
        billCode: billCode,
        brand: brand,
        departure: departure,
        arrival: arrival
      }
    }
    return options;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',     
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };
  constructor(private http: HttpClient) { }

  private billUrl = "http://localhost:8080/api/v1/customer/bills"  
  private billSearchUrl = "http://localhost:8080/api/v1/customer/bills/search" 
  private billInfoUrl = "http://localhost:8080/api/v1/customer/bills/select-info"


// C-Ngan
  getBillsByAccountId(accountId: number, page?: number): Observable<Page<Bill>>{ 
    return this.http.get<Page<Bill>>(this.billUrl + '/' + accountId, this.getOptions(page));
  }

// C-Ngan
  getSearchedBillsByAccountId(accountId: number, page: number, form?: FormGroup): Observable<Page<Bill>>{
    return this.http.get<Page<Bill>>(this.billSearchUrl + '/' + accountId, this.getOptions(page,form.value.billCode, form.value.brand, form.value.departure, form.value.arrival))
  }
// C-Ngan
  getSelectDto():Observable<SelectDto>{
    return this.http.get<SelectDto>(this.billInfoUrl);
  }

  getBillById(id: number): Observable<Bill>{
    return this.http.get<Bill>("http://localhost:8080/api/v1/customer/bill" + "/" + id);     
  }


}
