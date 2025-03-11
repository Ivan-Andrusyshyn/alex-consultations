import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-toggle-btn',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './toggle-btn.component.html',
  styleUrl: './toggle-btn.component.scss',
})
export class ToggleBtnComponent {
  private readonly themeService = inject(ThemeService);

  favoriteColorControl = new FormControl<boolean>(false);
  ngOnInit(): void {
    this.initializeTheme();
    this.favoriteColorControl.valueChanges.subscribe((t) => {
      this.themeService.toggleMode();
    });
  }

  private initializeTheme() {
    const savedMode = localStorage.getItem('theme');

    if (savedMode === 'light-mode') {
      this.favoriteColorControl.setValue(false);
    } else {
      this.favoriteColorControl.setValue(true);
    }
  }
}
