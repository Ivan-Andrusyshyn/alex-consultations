import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() titleLinks?: string = 'Приєднуйся';
}
