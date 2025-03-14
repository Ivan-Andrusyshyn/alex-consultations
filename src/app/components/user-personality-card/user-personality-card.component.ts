import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-personality-card',
  standalone: true,
  imports: [],
  templateUrl: './user-personality-card.component.html',
  styleUrl: './user-personality-card.component.scss',
})
export class UserPersonalityCardComponent {
  @Input() usersTypeName: string = '';
  svgUrl: string = 'assets/svg/tests/personalities/adventurer.svg';
}
