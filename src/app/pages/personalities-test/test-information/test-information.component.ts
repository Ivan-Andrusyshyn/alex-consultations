import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent, TitleCardComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent implements OnInit {
  routeUrl = '/tests/16-personalities/questions';
  private seoService = inject(SeoService);
  ngOnInit(): void {
    this.seoService.updateTitle('Інформація про тест 16 типів особистості');
    this.seoService.updateMetaTags(
      'Дізнайся більше про тест 16 типів особистості та краще зрозуміти себе.',
      'інформація про тест, 16 типів особистості, MBTI, психологічний тест, самопізнання'
    );
  }
}
