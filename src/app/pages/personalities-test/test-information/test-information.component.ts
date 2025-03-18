import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';
import { PersonalityTypesComponent } from '../../../components/test/personalities-test/personality-types/personality-types.component';
import { PersonalitiesTestComponent } from '../personalities-test.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    PersonalityTypesComponent,
    PersonalitiesTestComponent,
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

  ngOnInit(): void {
    this.seoService.updateTitle('Інформація про тест 16 типів особистості');
    this.seoService.updateMetaTags(
      'Дізнайся більше про тест 16 типів особистості та краще зрозуміти себе.',
      'інформація про тест, 16 типів особистості, MBTI, психологічний тест, самопізнання'
    );
  }
}
