import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RoleInRelationshipsService } from '../services/role-in-relationships.service';
import { RoleInRelationshipsResult } from '../types/role-in-relationships';

@Injectable({
  providedIn: 'root',
})
export class RoleInRelationshipsResultsResolver implements Resolve<any> {
  constructor(private roleInRelationshipsService: RoleInRelationshipsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    message: string;
    results: RoleInRelationshipsResult;
  }> {
    const personalityName = route.paramMap.get('categoryName');
    return this.roleInRelationshipsService.getRoleInRelationshipsInfoByCategory(
      personalityName!
    );
  }
}
