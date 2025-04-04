import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { AccentBtnComponent } from '../../components/accent-btn/accent-btn.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { ColorDotsComponent } from '../../components/color-dots/color-dots.component';
import { SeoService } from '../../shared/services/seo.service';
import { consultationData } from './consultations';
import { ConsultationContent } from '../../shared/types/consultations';
import { NgFor, NgIf } from '@angular/common';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [
    MatFormFieldModule,
    AccentBtnComponent,
    ColorDotsComponent,
    NgIf,
    NgFor,
    MatInputModule,
    MatButtonModule,
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

  consultationContent: ConsultationContent = consultationData;
  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

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
      height: '460px',
      width: '400px',
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
