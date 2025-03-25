import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SeoService } from '../../../shared/services/seo.service';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { AccentBtnComponent } from '../../../components/accent-btn/accent-btn.component';
import { TestListHeroComponent } from '../../../components/test/test-list-hero/test-list-hero.component';
import { RoleInRelationshipsService } from '../../../shared/services/role-in-relationships.service';
import { RoleInRelationshipsResult } from '../../../shared/types/role-in-relationships';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    SendFormOnEmailBtnComponent,
    AccentBtnComponent,
    AsyncPipe,
    TitleCardComponent,
    TestListHeroComponent,
    NgIf,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private readonly roleInRelationshipsService = inject(
    RoleInRelationshipsService
  );
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);
  private seoService = inject(SeoService);

  successRegistration = signal(false);
  isShowSendForm$!: Observable<boolean>;
  successMessage = signal(false);

  testResults$!: Observable<RoleInRelationshipsResult>;

  sendObject!: any;
  ngOnDestroy(): void {
    sessionStorage.clear();
  }
  readonly imgUrl = 'assets/svg/tests/heart.svg';

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Результати тесту твоя роль у стосунках?| Дізнайся, власну роль у стосунках.'
    );

    this.seoService.updateMetaTags(
      'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
      'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI'
    );

    this.activeRoute.params.subscribe((r) => {
      this.testResults$ = this.activeRoute.data.pipe(
        map((data) => {
          const response = data['roleInRelationshipsData'];

          this.sendObject = {
            category: response.results.category,
          };
          return response.results;
        })
      );
    });

    this.isShowSendForm$ = this.roleInRelationshipsService.getIsShowSendForm();
  }

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailAttractiveness({
          email: results.email,
          ...this.sendObject,
        })
        .pipe(
          tap((r) => {
            this.successMessage.set(true);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((r) => {
          this.toggleSendForm();
        });
    }
  }

  toggleSendForm() {
    this.roleInRelationshipsService.isShowSendForm.next(
      !this.roleInRelationshipsService.isShowSendForm.value
    );
  }

  compare(r: string, b: string) {
    return r === b;
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
