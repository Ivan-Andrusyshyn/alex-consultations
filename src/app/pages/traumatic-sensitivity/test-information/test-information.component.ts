import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInformationComponent {
  routeUrl = '/tests/traumatic-sensitivity/questions';
}
