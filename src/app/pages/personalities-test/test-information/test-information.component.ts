import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { PersonalityTypesComponent } from '../../../components/test/personalities-test/personality-types/personality-types.component';
import { PersonalitiesTestComponent } from '../personalities-test.component';
import { PersonalityTypes } from '../../../shared/types/16-personalities';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { personalityTypesContent } from '../../../../assets/content/16-personalities/personalityTypes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    PersonalityTypesComponent,
    PersonalitiesTestComponent,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent implements OnInit {
  routeUrl = '/tests/16-personalities/questions';
  svgName = { url: 'assets/svg/tests/icons-tests.svg#stretching' };
  imgUrl = 'assets/imgs/yoga-love.jpg';
  subtitleText =
    'Цей тест допоможе тобі краще зрозуміти свої природні схильності.';
  titleText = 'Тест 16 типів особистості';

  private seoService = inject(SeoService);
  private personalitiesService = inject(PersonalitiesTestService);
  private fb = inject(FormBuilder);

  formGroup: FormGroup = this.fb.group({});

  personalities: PersonalityTypes[] = personalityTypesContent;

  matchesResult$!: Observable<{
    message: string;
    relationshipsType: string;
    scoreResult: number;
  }>;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      selectedFirstPersonality: ['INFJ', Validators.required],
      selectedSecondPersonality: ['INTP', Validators.required],
    });
    this.seoService.updateTitle('Інформація про тест 16 типів особистості');
    this.seoService.updateMetaTags(
      'Дізнайся більше про тест 16 типів особистості та краще зрозуміти себе.',
      'інформація про тест, 16 типів особистості, MBTI, психологічний тест, самопізнання'
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const pair: [string, string] = [
        this.formGroup.get('selectedFirstPersonality')?.value,
        this.formGroup.get('selectedSecondPersonality')?.value,
      ];

      this.matchesResult$ =
        this.personalitiesService.getPersonalitiesCalculatorResults(pair);
    }
  }
}
