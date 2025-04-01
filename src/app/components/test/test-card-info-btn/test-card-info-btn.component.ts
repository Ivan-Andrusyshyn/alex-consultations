import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-card-info-btn',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './test-card-info-btn.component.html',
  styleUrl: './test-card-info-btn.component.scss',
})
export class TestCardInfoBtnComponent {
  @Input() route!: string;
}
