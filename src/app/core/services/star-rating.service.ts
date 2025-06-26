import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environment/environment';
import { TestName } from '../../shared/models/common-tests';

interface RatingStarResponse {
  rating: string | number;
  votes: string | number;
}
@Injectable({
  providedIn: 'root',
})
export class StarRatingService {
  envUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addNewRating(rating: {
    testName: TestName | '';
    score: number | string;
  }): Observable<RatingStarResponse> {
    return this.http.post<RatingStarResponse>(
      this.envUrl + '/rating/tests',
      rating
    );
  }

  getRating(testName: TestName | ''): Observable<RatingStarResponse> {
    if (!testName) console.error('TEST_NAME is not exist.');

    return this.http.get<RatingStarResponse>(
      this.envUrl + '/rating/tests/' + testName
    );
  }
}
