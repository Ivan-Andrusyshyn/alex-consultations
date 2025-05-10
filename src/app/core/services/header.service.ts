import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private isMobMenuOpen = new BehaviorSubject<boolean>(false);
  isMobMenuOpen$ = this.isMobMenuOpen.asObservable();

  toggleMenu() {
    this.isMobMenuOpen.next(!this.isMobMenuOpen.value);
  }
}
