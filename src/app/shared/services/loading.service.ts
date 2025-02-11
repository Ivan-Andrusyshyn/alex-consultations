import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  currentReqMethod = new BehaviorSubject<string | null>(null);

  showLoadingSpinner() {
    this.loading.next(true);
  }

  hideLoadingSpinner() {
    this.currentReqMethod.next(null);
    this.loading.next(false);
  }
  getReqMeth(): Observable<string | null> {
    return this.currentReqMethod.asObservable();
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
