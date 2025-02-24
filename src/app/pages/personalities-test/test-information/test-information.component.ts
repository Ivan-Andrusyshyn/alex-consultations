import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleCardComponent } from '../../../components/title-card/title-card.component';
import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent, TitleCardComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent {
  routeUrl = '/tests/16-personalities/questions';
}
