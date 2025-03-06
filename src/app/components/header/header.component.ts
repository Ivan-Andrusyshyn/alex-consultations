import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CubeComponent } from '../cube/cube.component';
import { MobComponent } from './mob/mob.component';
import { ToggleBtnComponent } from '../toggle-btn/toggle-btn.component';
import { StickyHeaderDirective } from './sticky-header.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    StickyHeaderDirective,
    ToggleBtnComponent,
    MobComponent,
    CubeComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  hiddenRoutes = true;
}
