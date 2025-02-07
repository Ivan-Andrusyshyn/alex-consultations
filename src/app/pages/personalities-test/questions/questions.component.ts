import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';

import { FormQuestionsComponent } from '../../../components/personalities-test/form-questions/form-questions.component';
import { Answer } from '../../../shared/types/test';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { GoogleSheetsService } from '../../../shared/services/google-sheets.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormQuestionsComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnDestroy, OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);
  private readonly googleSheetService = inject(GoogleSheetsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  answersArray!: Answer[];
  isShowResults$!: Observable<boolean>;
  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');

  timer: any;
  //
  ngOnInit(): void {}
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  nextQuestion(answers: any) {
    if (window.innerWidth <= 764) {
      this.timer = setTimeout(() => {
        this.addNextQuestion(answers);
      }, 200);
    } else {
      this.addNextQuestion(answers);
    }
  }

  private addNextQuestion({
    answers,
    currentQuestionNumber,
  }: {
    answers: Answer[];
    currentQuestionNumber: number;
  }) {
    if (this.personalitiesService.personalityForm.valid) {
      this.getResults(answers);
    } else if (
      this.personalitiesService.personalityForm.invalid &&
      currentQuestionNumber <= 90
    ) {
      this.scrollToTop();

      this.setSessionStorage(
        'answers',
        JSON.stringify({
          answers,
          currentQuestion: currentQuestionNumber,
        })
      );
    }
  }

  private getResults(answers: Answer[]) {
    this.personalitiesService
      .getPersonalitiesResultOfTest({ answers })
      .pipe(
        map((r) => {
          this.setSessionStorage(
            'personality-test',
            JSON.stringify({
              results: r.results.scores,
              scorePercentages: r.results.percentages,
            })
          );

          this.personalitiesService.scorePercentages.next(
            r.results.percentages
          );
          return r.results.percentages;
        }),

        switchMap((percentages) =>
          this.personalitiesService
            .getPersonType(percentages)
            .pipe(
              switchMap((r) =>
                this.sendDataToGoogleSheet(r.personType).pipe(
                  map(() => r.personType)
                )
              )
            )
        ),

        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((r) => {
        this.handlePersonType(r);
      });
  }

  private handlePersonType(personType: string) {
    this.router.navigate(['tests', '16-personalities', 'details', personType]);

    this.personalitiesService.personalityForm.reset();
    this.personalitiesService.counterQuestion.next(1);

    const answers = this.personalitiesService.personalityForm.value;
    this.setSessionStorage(
      'answers',
      JSON.stringify({
        answers,
        currentQuestion: 1,
      })
    );
  }

  private sendDataToGoogleSheet(personType: string) {
    return this.googleSheetService
      .postDataInSheet({
        testName: '16-personalities',
        results: personType,
        timestamp: this.timestamp ?? '',
        device: this.googleSheetService.getDeviceType(),
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.log(err.message);
          return throwError(() => err);
        })
      );
  }
  private scrollToTop(): void {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }

  private setSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}
