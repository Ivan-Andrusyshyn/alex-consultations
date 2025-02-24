import { Component } from '@angular/core';

import { TestCardStartBtnComponent } from '../../../components/test/test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-information',
  standalone: true,
  imports: [TestCardStartBtnComponent],
  templateUrl: './test-information.component.html',
  styleUrl: './test-information.component.scss',
})
export class TestInformationComponent {
  routeUrl = '/tests/toxical-relationship/questions';
}
