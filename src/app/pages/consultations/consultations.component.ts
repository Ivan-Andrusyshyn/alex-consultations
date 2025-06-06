import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { GoogleSheetsService } from '../../core/services/google-sheets.service';
import { SeoService } from '../../core/services/seo.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { consultationData } from './consultations';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';
import { ConsultationsCardsComponent } from '../../shared/components/test/consultations-cards/consultations-cards.component';

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
})
export class ConsultationsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seoService = inject(SeoService);
  private readonly googleService = inject(GoogleSheetsService);
  successRegistration = signal(false);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '1320px',
      data: {
        isForm: true,
        contentType: 'form-consultation',
        title: 'Відчуй свою глибину. Запишись на консультацію!',
        btn: {
          cancel: 'Ні, дякую',
          confirm: 'Записатися',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((r) => !!r),
        switchMap((r) =>
          this.googleService.postRegistrationInSheet(r).pipe(
            tap(() => this.successRegistration.set(true)),
            catchError((error) => {
              this.successRegistration.set(false);
              return throwError(() => error);
            })
          )
        )
      )
      .subscribe();
  }
}
