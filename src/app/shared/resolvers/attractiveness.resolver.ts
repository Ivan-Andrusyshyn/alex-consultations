import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AttractivenessService } from '../services/attractiveness.service';
import { AttractivenessResult } from '../types/attractiveness';

@Injectable({
  providedIn: 'root',
})
export class AttractivenessResultsResolver implements Resolve<any> {
  constructor(private attractivenessService: AttractivenessService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ message: string; results: AttractivenessResult }> {
    const personalityName = route.paramMap.get('categoryName') as string;

    return this.attractivenessService.getAttractivenessInfoByCategory(
      personalityName
    );
  }
}
