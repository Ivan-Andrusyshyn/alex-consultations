import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersonalitiesTestService } from '../services/personalities-test.service';
import { TypeInformation } from '../types/16-personalities';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesTestResolver implements Resolve<any> {
  constructor(
    private personalitiesService: PersonalitiesTestService,
    private loadingService: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ personType: string; personInformation: TypeInformation }> {
    const personalityName = route.paramMap.get('personalitiesName');
    return this.personalitiesService.getPersonTypeByResults(personalityName!);
  }
}
