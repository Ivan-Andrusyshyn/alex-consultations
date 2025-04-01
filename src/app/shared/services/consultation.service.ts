import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { BenefitConsultationData } from '../types/benefit-consultation';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private readonly BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBenefitConsultation(): Observable<{
    message: string;
    results: BenefitConsultationData;
  }> {
    return this.http.get<{
      message: string;
      results: BenefitConsultationData;
    }>(this.BASE_URL + '/consultation' + '/benefit');
  }
}
