import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SendResultsFormComponent } from '../../../components/send-results-form/send-results-form.component';
import { SendFormOnEmailBtnComponent } from '../../../components/send-form-on-email-btn/send-form-on-email-btn.component';
import { MailerService } from '../../../shared/services/mailer.service';
import { ToxicalRelationshipService } from '../../../shared/services/toxical-relationship.service';
import { ParagraphPipe } from './paragraph.pipe';
import { MatDialog } from '@angular/material/dialog';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [
    SendResultsFormComponent,
    SendFormOnEmailBtnComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    ParagraphPipe,
    PrimaryBtnComponent,
  ],
  templateUrl: './test-results.component.html',
  styleUrl: './test-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent implements OnInit, OnDestroy {
  private toxicalRelationshipService = inject(ToxicalRelationshipService);
  private mailerService = inject(MailerService);
  private destroyRef = inject(DestroyRef);
  private activeRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  private readonly googleService = inject(GoogleSheetsService);

  successRegistration = signal(false);
  isShowSendForm$!: Observable<boolean>;
  successMessage = signal(false);

  testResults$!: Observable<any>;

  sendObject!: any;
  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((r) => {
      this.testResults$ = this.toxicalRelationshipService
        .getToxicalRelationshipInfoByCategory(r['traumaticSensitivity'])
        .pipe(
          map((info) => {
            console.log(info);
            this.sendObject = {
              category: info.results.category,
            };
            return info.results;
          })
        );
    });

    this.isShowSendForm$ = this.toxicalRelationshipService.getIsShowSendForm();
  }

  sendResultsOnEmail(results: { email: string }) {
    if (results.email) {
      this.mailerService
        .postEmailToxicalRelationship({
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
    this.toxicalRelationshipService.isShowSendForm.next(
      !this.toxicalRelationshipService.isShowSendForm.value
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
