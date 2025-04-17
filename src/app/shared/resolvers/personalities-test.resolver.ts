import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalitiesTestService } from '../services/personalities-test.service';

import { LoadingService } from '../services/loading.service';
import { TypeResultInformation } from '../types/16-personalities-results';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesTestResultResolver implements Resolve<any> {
  constructor(
    private personalitiesService: PersonalitiesTestService,
    private loadingService: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    personType: string;
    personInformation: TypeResultInformation;
  }> {
    const personalityName = route.paramMap.get('categoryName');
    return this.personalitiesService.getPersonTypeByResults(personalityName!);
  }
}
