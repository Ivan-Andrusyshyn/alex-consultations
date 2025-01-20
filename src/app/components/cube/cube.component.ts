import { Component, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
})
export class CubeComponent {}
