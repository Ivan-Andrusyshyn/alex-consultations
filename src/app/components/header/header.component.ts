import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CubeComponent } from '../cube/cube.component';
import { MobComponent } from './mob/mob.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MobComponent, CubeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
