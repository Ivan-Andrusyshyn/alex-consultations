import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { CountingClicksService } from '../services/counting-clicks.service';

@Injectable({
  providedIn: 'root',
})
export class CountingClicksResolver implements Resolve<any> {
  constructor(private countingClicksService: CountingClicksService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    allClicksData: any;
    message: string;
  }> {
    return this.countingClicksService.getCountingClicksInSocialLinks();
  }
}
