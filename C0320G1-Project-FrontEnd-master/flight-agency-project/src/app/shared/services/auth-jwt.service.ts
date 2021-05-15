import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthLoginInfo } from '../models/dto/login-info';
import { JwtResponse } from '../models/dto/jwt-response';
import { TokenDto } from '../models/dto/token-dto';


@Injectable({
  providedIn: 'root'
})
//Created by: Quân
export class AuthJwtService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  loginUrl = 'http://localhost:8080/api/v1/';

  constructor(private httpClient: HttpClient) {
  }

  attemptAuth(userInfo: AuthLoginInfo): Observable<JwtResponse> {

    return this.httpClient.post<JwtResponse>(this.loginUrl + 'login', userInfo, this.httpOptions);
  }

  public google(tokenDto: TokenDto): Observable<JwtResponse> {
    console.log(this.httpOptions)

    return this.httpClient.post<JwtResponse>(this.loginUrl + 'google', tokenDto, this.httpOptions);
  }

  public facebook(tokenDto: TokenDto): Observable<JwtResponse> {
    console.log(this.httpOptions)
    return this.httpClient.post<JwtResponse>(this.loginUrl + 'facebook', tokenDto, this.httpOptions);
  }


}
