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

  favoriteColorControl = new FormControl('');
  ngOnInit(): void {
    this.favoriteColorControl.valueChanges.subscribe((t) => {
      this.themeService.toggleMode();
    });
  }
}
