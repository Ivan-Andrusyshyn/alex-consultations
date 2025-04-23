import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CountingClicksService {
  private readonly BASE_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  postCountingClicksInSocialLinks(
    socialMedia: 'telegram' | 'instagram'
  ): Observable<{
    allClicksData: any;
    message: string;
  }> {
    const scriptUrl: string = '/counter/social-links';
    return this.http.post<{ allClicksData: any; message: string }>(
      this.BASE_URL + scriptUrl,
      {
        clickFrom: socialMedia,
      }
    );
  }
  getCountingClicksInSocialLinks(): Observable<{
    allClicksData: any;
    message: string;
  }> {
    const scriptUrl: string = '/counter/social-links';
    return this.http.get<{ allClicksData: any; message: string }>(
      this.BASE_URL + scriptUrl
    );
  }
}
