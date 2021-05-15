import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {listCustomerDto} from '../models/dto/listCustomerDto';
import {Page} from '../models/dto/page';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private readonly API_URL_CUSTOMER = 'http://localhost:8080/api/v1/customer/';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCustomerHttpOptions_2( page: number, key : string, value : string): Object {
    const customer = {
      headers: this.httpOptions.headers,
      params: {
        page,
        key,
        value
      }
    };
    return customer;
  }

  // creator: Mậu
  getCustomerHttpOptions( page: number): Object {
    const customer = {
      headers: this.httpOptions.headers,
      params: {
        page
      }
    };
    return customer;
  }

  getPage_2(page: number, key : string, value : string): Observable<Page<listCustomerDto>> {
    return this.http.get<Page<listCustomerDto>>(this.API_URL_CUSTOMER + 'search', this.getCustomerHttpOptions_2(page,key,value));
  }

}
