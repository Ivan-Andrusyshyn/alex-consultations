import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-personality-card',
  standalone: true,
  imports: [],
  templateUrl: './user-personality-card.component.html',
  styleUrl: './user-personality-card.component.scss',
})
export class UserPersonalityCardComponent implements OnInit {
  @Input() usersTypeName: string = '';
  @Input() avatarUrl: string = '';
  svgUrl: string = 'assets/svg/tests/personalities/adventurer.svg';
  ngOnInit(): void {}
}
