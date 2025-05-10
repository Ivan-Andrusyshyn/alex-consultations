import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  @Input() titleLinks?: string = 'Приєднуйся ❤️';
  @Input() svgSize = 'small';
  @Input() isDarkTheme!: boolean;
  @Input() showAllMedia: boolean = false;

  socialLinks = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@alex_white_light?_t=ZM-8u3NPohrWXn&_r=1',
      iconName: 'tiktok',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr',
      iconName: 'instagram',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/alex_andrusishin',
      iconName: 'telegram',
    },
  ];
}
