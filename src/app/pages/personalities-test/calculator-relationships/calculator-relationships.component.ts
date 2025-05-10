import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, of, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';

import { personalityTypesContent } from '../../../../assets/content/16-personalities/personalityTypes';
import { GoogleSheetsService } from '../../../core/services/google-sheets.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PersonalitiesCalculatorService } from '../../../core/services/personalities-calculator.service';
import { RouteTrackerService } from '../../../core/services/route-tracker.service';
import { SeoService } from '../../../core/services/seo.service';
import { TitleCardComponent } from '../../../shared/components/title-card/title-card.component';
import { PersonalityTypes } from '../../../shared/models/16-personalities';
import {
  CalculatorResult,
  CalculatorDisclaimer,
} from '../../../shared/models/personalities-calculator';
import { PrimaryBtnComponent } from '../../../shared/components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-calculator-relationships',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    TitleCardComponent,
    MatFormFieldModule,
    MatSelectModule,
    PrimaryBtnComponent,
  ],
  templateUrl: './calculator-relationships.component.html',
  styleUrl: './calculator-relationships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorRelationshipsComponent implements OnInit, OnDestroy {
  private personalitiesCalculatorService = inject(
    PersonalitiesCalculatorService
  );
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);
  private googleSheetService = inject(GoogleSheetsService);
  private loadingService = inject(LoadingService);
  private destroyRef = inject(DestroyRef);

  timestamp = DateTime.now()
    .setZone('Europe/Kyiv')
    .toFormat('yyyy-MM-dd HH:mm:ss');

  imgUrl = 'assets/svg/tests/crossfit.svg';
  subtitleText = 'Дізнайтеся рівень гармонії ваших стосунків.';
  titleText = 'Калькулятор сумісності';

  formGroup: FormGroup = this.fb.group({});
  personalities: PersonalityTypes[] = personalityTypesContent;

  calculatorResult$!: Observable<{
    message: string;
    relationshipsType: { title: string; text: string };
    scoreResult: number;
    calculatorResults: CalculatorResult;
  }>;
  calculatorDeclaimer$!: Observable<CalculatorDisclaimer>;
  ngOnDestroy(): void {
    sessionStorage.removeItem('personalities-calculator');
  }

  ngOnInit(): void {
    this.seoService.updateTitle(
      'Калькулятор сумісності MBTI: перевірте гармонію у стосунках'
    );

    this.seoService.updateMetaTags(
      'Дізнайтеся рівень гармонії ваших стосунків за допомогою тесту 16 типів особистості (MBTI). Визначте, наскільки ваші особистості взаємодоповнюють одна одну.',
      'калькулятор сумісності MBTI, тест на сумісність у стосунках, 16 типів особистості, психологія стосунків, MBTI пари, як покращити стосунки, аналіз особистостей у парі'
    );

    this.calculatorDeclaimer$ = this.personalitiesCalculatorService
      .getPersonalitiesCalculatorDisclaimer()
      .pipe(map((r) => r.calculatorDisclaimer));

    const data = JSON.parse(
      sessionStorage.getItem('personalities-calculator') ?? 'null'
    );

    this.calculatorResult$ = of(data);

    this.formGroup = this.fb.group({
      selectedFirstPersonality: ['INFJ', Validators.required],
      selectedSecondPersonality: ['INTP', Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const pair: [string, string] = [
        this.formGroup.get('selectedFirstPersonality')?.value,
        this.formGroup.get('selectedSecondPersonality')?.value,
      ];
      this.loadingService.showLoadingSpinner();
      this.calculatorResult$ = this.personalitiesCalculatorService
        .getPersonalitiesCalculatorResults(pair, {
          routeTracker: this.routeTracker.getRoutes(),
          referrer: document.referrer ?? '',
          testName: '16-personalities-calculator',
          timestamp: this.timestamp ?? '',
          device: this.googleSheetService.getDeviceType(),
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((r) => {
            sessionStorage.setItem(
              'personalities-calculator',
              JSON.stringify(r)
            );
          })
        );
    }
  }
}
