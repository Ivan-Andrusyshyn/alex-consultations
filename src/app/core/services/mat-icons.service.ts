import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class MatIconsService {
  private icons = [
    {
      name: 'pin',
      url: '/assets/new/shared/pin.svg',
    },
    {
      name: 'human-body',
      url: '/assets/new/core/main/human-body.svg',
    },
    {
      name: 'krona-1',
      url: '/assets/new/shared/krona-1.svg',
    },
    {
      name: 'clock',
      url: '/assets/new/shared/clock.svg',
    },
    {
      name: 'arrows',
      url: '/assets/new/shared/arrows.svg',
    },
    {
      name: 'back-in-time',
      url: '/assets/new/shared/back-in-time.svg',
    },
    {
      name: 'prev-btn',
      url: '/assets/new/shared/prev-btn.svg',
    },
    {
      name: 'next-btn',
      url: '/assets/new/shared/next-btn.svg',
    },
    {
      name: 'coins',
      url: '/assets/new/shared/coins.svg',
    },
    {
      name: 'telegram',
      url: '/assets/new/core/media/telegram.svg',
    },
    {
      name: 'instagram',
      url: '/assets/new/core/media/instagram.svg',
    },
    {
      name: 'tiktok',
      url: '/assets/new/core/media/tiktok.svg',
    },
    {
      name: 'telegram-dark',
      url: '/assets/new/core/media/telegram-dark.svg',
    },
    {
      name: 'instagram-dark',
      url: '/assets/new/core/media/instagram-dark.svg',
    },
    {
      name: 'tiktok-dark',
      url: '/assets/new/core/media/tiktok-dark.svg',
    },
    {
      name: 'brain-in-head',
      url: '/assets/new/core/main/hero/brain-in-head.svg',
    },
    {
      name: 'brain-in-head-hover',
      url: '/assets/new/core/main/hero/brain-in-head-hover.svg',
    },
    {
      name: 'person-meditate',
      url: '/assets/new/core/main/hero/person-meditate.svg',
    },
    {
      name: 'person-meditate-hover',
      url: '/assets/new/core/main/hero/person-meditate-hover.svg',
    },
    {
      name: 'two-personalities',
      url: '/assets/new/core/main/hero/two-personalities.svg',
    },
    {
      name: 'two-personalities-hover',
      url: '/assets/new/core/main/hero/two-personalities-hover.svg',
    },
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }
  private registerIcons(): void {
    this.icons.forEach(({ name, url }) => {
      this.iconRegistry.addSvgIcon(
        name,
        this.sanitizer.bypassSecurityTrustResourceUrl(url)
      );
    });
  }
}
