import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { SeoService } from '../../core/services/seo.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { NotificationService } from '../../core/services/notification.service';
import { ModalService } from '../../core/services/modal.service';
import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { fadeInAnimation } from '../../core/animations/fadeIn-animation';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SocialLinksComponent, PrimaryBtnComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);
  private googleService = inject(GoogleSheetsService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Про нас | Дізнайся більше про нашу команду та місію'
    );
    this.seoService.updateMetaTags(
      'Я створю тести для самопізнання та розвитку особистості. Дізнайся мою більше місію та цілі.',
      'ментор, вчитель, місія, самопізнання, розвиток особистості, тести, психологія, саморозвиток'
    );
  }

  private showSuccess() {
    this.notificationService.setNotification(
      '✅ Дякуємо! Вас успішно записано на безкоштовну консультацію. Ми скоро з вами зв’яжемося!'
    );
  }
  private showError() {
    this.notificationService.setNotification(
      '❌ Сталася помилка під час запису на консультацію. Спробуйте ще раз.'
    );
  }

  openDialog(): void {
    this.modalService
      .openModal({
        width: '90vw',
        isForm: true,
        isConfirm: false,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((r) => !!r),
        switchMap((r) =>
          this.googleService.postRegistrationInSheet(r).pipe(
            tap(() => this.showSuccess()),
            catchError((error) => {
              this.showError();
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe(() => {});
  }
}
