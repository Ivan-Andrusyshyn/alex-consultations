import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  ofertaUrl = 'assets/new/core/footer/oferta.pdf';
  conditionsServiceUrl = 'assets/new/core/footer/conditions-service.pdf';
}
