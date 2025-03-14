import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-personality-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-personality-card.component.html',
  styleUrl: './user-personality-card.component.scss',
})
export class UserPersonalityCardComponent implements OnInit {
  @Input() usersTypeName: string = '';
  @Input() avatarUrl: string = '';
  @Input() personalityType: string = '';
  svgUrl: string = 'assets/svg/tests/personalities/adventurer.svg';
  ngOnInit(): void {}
}
