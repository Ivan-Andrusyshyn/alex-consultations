import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { GoogleSheetsService } from '../services/google-sheets.service';
import { MobComponent } from './mob/mob.component';
import { StickyHeaderDirective } from './sticky-header.directive';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, StickyHeaderDirective, MobComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  hiddenRoutes = true;
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);

  openInstagram(): void {
    window.open(
      'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr',
      '_blank'
    );
  }
}
