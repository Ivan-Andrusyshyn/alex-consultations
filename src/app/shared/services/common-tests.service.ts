import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonTestsService {
  private readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  testPassingCounter(): Observable<any> {
    return this.http.get(this.BASE_URL + '/common-tests' + '/counter-tests');
  }
}
