import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ToxicalRelationshipService } from '../services/toxical-relationship.service';
import { RelationshipResult } from '../types/toxical-relationship';

@Injectable({
  providedIn: 'root',
})
export class ToxicalRelationshipResultsResolver implements Resolve<any> {
  constructor(
    private toxicalRelationshipsService: ToxicalRelationshipService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ message: string; results: RelationshipResult }> {
    const personalityName = route.paramMap.get('categoryName');
    return this.toxicalRelationshipsService.getToxicalRelationshipInfoByCategory(
      personalityName!
    );
  }
}
