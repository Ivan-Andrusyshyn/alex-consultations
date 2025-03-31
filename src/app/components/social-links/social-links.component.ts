import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [NgStyle, NgFor, NgIf],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() titleLinks?: string = 'Приєднуйся ❤️';
  @Input() isTheme: boolean = true;
  @Input() showAllMedia: boolean = false;

  textColor = 'var(--textColor)';

  socialLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/@alex_andrusishin',
      imgSrc: '../../../assets/svg/media/telegram.svg',
      rotation: '-15',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr',
      imgSrc: '../../../assets/svg/media/instagram.svg',
      rotation: '25',
    },
  ];

  ngOnInit() {
    if (this.showAllMedia) {
      this.socialLinks.push({
        name: 'TikTok',
        url: 'https://www.tiktok.com/@alex_white_light?_t=ZM-8u3NPohrWXn&_r=1',
        imgSrc: '../../../assets/svg/media/tiktok.svg',
        rotation: '5',
      });
    }
  }
}
