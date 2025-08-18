import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestsUserDataService {
  private readonly testsUrl = environment.apiUrl + '/tests-user-data';

  //
  constructor(private http: HttpClient) {}

  getAllTestsUsersData(): Observable<any> {
    return this.http.get(this.testsUrl + '/all');
  }
}
