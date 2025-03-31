import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ToxicalRelationshipService } from '../../services/toxical-relationship.service';
import { TestInformation } from '../../types/toxical-relationship';

@Injectable({
  providedIn: 'root',
})
export class ToxicalRelationshipDescriptionResolver implements Resolve<any> {
  constructor(
    private toxicalRelationshipsService: ToxicalRelationshipService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ message: string; testInformation: TestInformation }> {
    return this.toxicalRelationshipsService.getTestInformation();
  }
}
