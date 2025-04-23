import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AccentBtnComponent } from '../accent-btn/accent-btn.component';
import { CountingClicksService } from '../../shared/services/counting-clicks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-social-links',
  standalone: true,
  imports: [AccentBtnComponent],
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
    this.countingService
      .postCountingClicksInSocialLinks(socialMedia)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        window.open(url, '_blank');
      });
  }
}
