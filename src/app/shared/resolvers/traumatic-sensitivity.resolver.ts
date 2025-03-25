import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TraumaticSensitivityService } from '../services/traumatic-sensitivity.service';
import { TypeInformation } from '../types/traumatic-sensitivity';

@Injectable({
  providedIn: 'root',
})
export class TraumaticSensitivityResultsResolver implements Resolve<any> {
  constructor(
    private traumaticSensitivityService: TraumaticSensitivityService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ results: TypeInformation; message: string }> {
    const personalityName = route.paramMap.get('categoryName');
    return this.traumaticSensitivityService.getEmotionsTypeInfoByResults(
      personalityName!
    );
  }
}
