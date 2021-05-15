import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Feedback } from '../models/feedback';
import { Page } from './../models/dto/page';
import { FeedbackSearch } from '../models/feedbackSearch';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly ADMIN_URL = 'http://localhost:8080/api/v1/admin';

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) {
  }

  getFeedbackHttpOptions(searchField: FeedbackSearch, page: number): Object {
    const feedback = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        customerName: searchField.customerName,
        createDate: searchField.createDate,
        processStatus: searchField.processStatus,
        page
      }
    };
    return feedback;
  }

  getFeedbackPage(searchField: FeedbackSearch, page: number): Observable<Page<Feedback>> {
    return this.http.get<Page<Feedback>>(`${this.ADMIN_URL}/feedback-page`, this.getFeedbackHttpOptions(searchField, page));
  }

  getFeedbackList(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.ADMIN_URL}/feedback-list`, this.options);
  }

  editFeedback(feedback, id): Observable<Feedback> {
    console.log(`${this.ADMIN_URL}/feedback` + '/' + id);
    console.log(feedback);
    return this.http.put<Feedback>(`${this.ADMIN_URL}/feedback` + '/' + id, feedback);
  }
}
