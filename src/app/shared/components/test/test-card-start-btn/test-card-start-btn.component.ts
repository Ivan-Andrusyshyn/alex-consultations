import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-card-start-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-card-start-btn.component.html',
  styleUrl: './test-card-start-btn.component.scss',
})
export class TestCardStartBtnComponent {
  @Input() route!: string;
  @Input() btnText = 'Почати тест';
}
