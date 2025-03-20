import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OnAppInitService {
  private readonly BASE_URL: string = environment.apiUrl;

  constructor(readonly http: HttpClient) {}

  loadOnInit(): Observable<any> {
    return this.http.get(this.BASE_URL + '/files' + '/load-files');
  }
}
