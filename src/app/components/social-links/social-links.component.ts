import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() titleLinks?: string = 'Приєднуйся';
  @Input() isTheme: boolean = true;
  @Input() showAllMedia: boolean = false;

  textColor = 'var(--textColor)';
}
