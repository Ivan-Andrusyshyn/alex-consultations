import { Injectable } from '@angular/core';

enum Mode {
  LIGHT = 'light-mode',
  DARK = 'dark-mode',
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}
  currentMode: Mode = Mode.LIGHT;

  toggleMode() {
    document.body.classList.toggle(Mode.LIGHT);
    document.body.classList.toggle(Mode.DARK);
    const isLightMode = this.currentMode === Mode.LIGHT;

    this.updateCurrentMode(isLightMode ? Mode.DARK : Mode.LIGHT);
  }

  initTheme() {
    const savedMode = localStorage.getItem('theme') as Mode;
    if (savedMode) {
      this.currentMode = savedMode;
      document.body.classList.add(this.currentMode);
    } else {
      this.updateCurrentMode(Mode.LIGHT);
    }
  }
  private updateCurrentMode(mode: Mode) {
    this.currentMode = mode;
    localStorage.setItem('theme', mode);
  }
}
