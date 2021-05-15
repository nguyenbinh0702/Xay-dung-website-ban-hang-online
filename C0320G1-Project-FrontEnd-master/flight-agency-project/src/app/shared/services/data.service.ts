//BHung create send data service
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DataService {

  private messageSource = new BehaviorSubject<number[]>([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeData(data: number[]) {
    this.messageSource.next(data);
  }

}