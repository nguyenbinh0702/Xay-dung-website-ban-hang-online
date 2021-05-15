import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/Feedback';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    API_URL = 'http://localhost:8080/api/v1/home';

    httpOptions = {
        headers : new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) {

    }

    saveFeedback(feedbackDTO: Object): Observable<Feedback> {
        return this.http.post<Feedback>(this.API_URL + '/save-feedback',JSON.stringify(feedbackDTO), this.httpOptions);
    }

}
