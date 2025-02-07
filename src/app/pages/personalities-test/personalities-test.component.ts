import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personalities-test',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './personalities-test.component.html',
  styleUrl: './personalities-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesTestComponent {}
