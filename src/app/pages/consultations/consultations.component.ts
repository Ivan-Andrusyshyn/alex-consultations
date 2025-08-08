import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { SeoService } from '../../core/services/seo.service';
import { consultationData } from './consultations';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { ConsultationsCardsComponent } from '../../shared/components/test/consultations-cards/consultations-cards.component';
import { ModalService } from '../../core/services/modal.service';
import { NotificationService } from '../../core/services/notification.service';
import { fadeInAnimation } from '../../core/animations/fadeIn-animation';

type SectionType = {
  sectionTitle: string;
  listItems: {
    itemTitle: string;
    subtitle: string;
  }[];
};

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TitleCardComponent,
    ServiceCardComponent,
    PrimaryBtnComponent,
    ConsultationsCardsComponent,
  ],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationsComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private seoService = inject(SeoService);
  private googleService = inject(GoogleSheetsService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  consultationContent: {
    myHelp: SectionType;
    aboutConsultation: SectionType;
    itWorksCards: { title: string; svgPath: string; subtitle: string }[];
  } = consultationData;
  titleText =
    'Замість років пошуків — цілісне розуміння себе вже на першій зустрічі.';

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.seoService.updateTitle(
      'Консультації | Отримайте цілісну картину своєї особистості за одну зустріч'
    );
    this.seoService.updateMetaTags(
      'Отримайте унікальну консультацію з аналізу когнітивних функцій для самопізнання та розвитку.',
      'консультація, самопізнання, розвиток особистості, когнітивні функції, психологія, гармонія, життя'
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
      .subscribe();
  }
}
