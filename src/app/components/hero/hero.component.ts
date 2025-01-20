import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CubeComponent } from '../cube/cube.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, CubeComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
