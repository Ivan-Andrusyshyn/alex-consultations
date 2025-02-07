import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  private isReqMethodGet = new BehaviorSubject<boolean>(true);

  showLoadingSpinner() {
    this.loading.next(true);
  }

  hideLoadingSpinner() {
    this.loading.next(false);
  }
  getReqMethIsGet(): Observable<boolean> {
    return this.isReqMethodGet.asObservable();
  }
  setRequestMethod(method: string) {
    this.isReqMethodGet.next(method === 'GET');
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
