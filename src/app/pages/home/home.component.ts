import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { ModalComponent } from '../../components/modal/modal.component';
import { TestListHeroComponent } from '../../components/test/test-list-hero/test-list-hero.component';
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { SideBtnComponent } from '../../components/side-btn/side-btn.component';
import { SeoService } from '../../shared/services/seo.service';
import { InfoCardComponent } from '../../components/home/info-card/info-card.component';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';
import { AccentBtnComponent } from '../../components/accent-btn/accent-btn.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestListHeroComponent, InfoCardComponent, AccentBtnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private readonly googleService = inject(GoogleSheetsService);
  successRegistration = signal(false);

  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle('Тести для самопізнання та розвитку');
    this.seoService.updateMetaTags(
      'Дізнайся про різноманітні тести для самопізнання, розвитку особистості та оцінки стосунків. Пройди психологічні тести, щоб зрозуміти себе краще і досягти гармонії в житті.',
      'тести,краща версія самого себе, самопізнання, розвиток особистості, психологічні тести, оцінка стосунків, тест на особистість, саморозвиток'
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '500px',
      width: '400px',
      data: {
        contentType: 'form-consultation',
        title: '🔥 Готові до прориву?',
        btn: {
          cancel: 'Ні, дякую',
          confirm: '🚀 Отримати консультацію',
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
