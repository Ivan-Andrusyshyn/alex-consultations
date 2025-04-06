import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-title-card',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  @Input() titleText!: string;
  @Input() subtitleText!: string;
  @Input() imgUrl!: string;

  link = {
    title: 'Приєднуйся ',
    name: 'Instagram',
    imgSrc: '../../../assets/svg/media/instagram.svg',
    url: 'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr',
  };
}
