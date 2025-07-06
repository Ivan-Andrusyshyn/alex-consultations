import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CountingClicksService } from '../../../core/services/counting-clicks.service';

@Component({
  selector: 'app-modal-social-links',
  standalone: true,
  imports: [],
  templateUrl: './modal-social-links.component.html',
  styleUrl: './modal-social-links.component.scss',
})
export class ModalSocialLinksComponent {
  private countingService = inject(CountingClicksService);
  private destroyRef = inject(DestroyRef);

  isShowNextStep = signal(false);

  showNextStepBuClick() {
    this.isShowNextStep.set(true);
  }
  openInstagram() {
    this.postCountingClicksInSocialLinks(
      'instagram',
      'https://www.instagram.com/depth_seekerr?igsh=MTZuNGxudnNrNWYzeg%3D%3D&utm_source=qr'
    );
  }

  openTelegram() {
    this.postCountingClicksInSocialLinks(
      'telegram',
      'https://t.me/alex_andrusishin'
    );
  }

  postCountingClicksInSocialLinks(
    socialMedia: 'telegram' | 'instagram',
    url: string
  ) {
    window.open(url, '_blank');

    this.countingService
      .postCountingClicksInSocialLinks(socialMedia)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {});
  }
}
