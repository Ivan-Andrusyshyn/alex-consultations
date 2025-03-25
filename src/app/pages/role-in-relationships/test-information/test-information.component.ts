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
import { RoleInRelationshipsService } from '../../../shared/services/role-in-relationships.service';
import { map, Observable } from 'rxjs';
import { RoleInRelationshipsInformation } from '../../../../../server/src/types/role-in-relationships';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [
    TestCardStartBtnComponent,
    TitleCardComponent,
    AsyncPipe,
    PersonalityTypesComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent implements OnInit {
  readonly routeUrl = '/tests/role-in-relationships/questions';

  readonly imgUrl = 'assets/svg/tests/heart.svg';

  readonly subtitleText =
    'Дізнайся, яка твоя роль у стосунках, і краще зрозумій свої природні схильності у взаєминах.';

  readonly titleText = 'Яка твоя роль у стосунках?';

  private seoService = inject(SeoService);
  private roleInRelationshipsService = inject(RoleInRelationshipsService);

  testInformation$!: Observable<RoleInRelationshipsInformation>;

  ngOnInit(): void {
    this.testInformation$ = this.roleInRelationshipsService
      .getRoleInRelationshipsTestInformation()
      .pipe(map((r) => r.testInformation));

    this.seoService.updateTitle(
      'Тест: Яка твоя роль у стосунках? - Детальна інформація'
    );
    this.seoService.updateMetaTags(
      'Дізнайся більше про тест "Яка твоя роль у стосунках?", щоб краще зрозуміти свої сильні сторони, стиль спілкування та природні схильності.',
      'тест про стосунки, роль у стосунках, психологічний тест, самопізнання, взаємини, MBTI'
    );
  }
}
