import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor(private http: HttpClient) {}

  postEmailPersonalities(value: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/send-email' + '/16-personalities',
      {
        value,
      }
    );
  }
  postEmailTraumatic(value: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/send-email' + '/traumatic-sensitivity',
      {
        value,
      }
    );
  }
}
