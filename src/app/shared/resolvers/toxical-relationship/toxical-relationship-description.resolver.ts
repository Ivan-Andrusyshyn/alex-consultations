import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TestInformation } from '../../models/toxical-relationship';
import { ToxicalRelationshipService } from '../../../core/services/toxical-relationship.service';

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
