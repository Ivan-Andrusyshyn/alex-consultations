import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import {
  CalculatorResult,
  PersonalityTypes,
} from '../../../shared/types/16-personalities';
import { personalityTypesContent } from '../../../../assets/content/16-personalities/personalityTypes';
import { TitleCardComponent } from '../../../components/title-card/title-card.component';

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
  ],
  templateUrl: './calculator-relationships.component.html',
  styleUrl: './calculator-relationships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorRelationshipsComponent implements OnInit {
  private personalitiesService = inject(PersonalitiesTestService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  formGroup: FormGroup = this.fb.group({});
  personalities: PersonalityTypes[] = personalityTypesContent;

  calculatorResult$!: Observable<{
    message: string;
    relationshipsType: { title: string; text: string };
    scoreResult: number;
    calculatorResults: CalculatorResult;
  }>;

  imgUrl = 'assets/svg/tests/crossfit.svg';
  subtitleText = 'Дізнайтеся рівень гармонії ваших стосунків.';
  titleText = 'Калькулятор сумісності';
  ngOnInit(): void {
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

      this.calculatorResult$ = this.personalitiesService
        .getPersonalitiesCalculatorResults(pair)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((r) => {
            console.log(r);
          })
        );
    }
  }
}
