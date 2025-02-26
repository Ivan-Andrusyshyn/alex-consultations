import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CubeComponent } from '../cube/cube.component';
import { MobComponent } from './mob/mob.component';
import { ToggleBtnComponent } from '../toggle-btn/toggle-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ToggleBtnComponent, MobComponent, CubeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  hiddenRoutes = true;
}
