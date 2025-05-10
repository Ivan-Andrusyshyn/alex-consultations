import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TestInformation } from '../../models/traumatic-sensitivity';
import { TraumaticSensitivityService } from '../../../core/services/traumatic-sensitivity.service';

@Injectable({
  providedIn: 'root',
})
export class TraumaticSensitivityInformationResolver
  implements
    Resolve<{
      message: string;
      testInformation: TestInformation;
    }>
{
  constructor(
    private traumaticSensitivityService: TraumaticSensitivityService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ message: string; testInformation: TestInformation }> {
    return this.traumaticSensitivityService.getTestInformation();
  }
}
