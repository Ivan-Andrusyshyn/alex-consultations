import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TestCardInfoBtnComponent } from '../test-card-info-btn/test-card-info-btn.component';
import { TestCardStartBtnComponent } from '../test-card-start-btn/test-card-start-btn.component';

@Component({
  selector: 'app-test-card-hero',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    TestCardInfoBtnComponent,
    TestCardStartBtnComponent,
  ],
  templateUrl: './test-card-hero.component.html',
  styleUrl: './test-card-hero.component.scss',
})
export class TestCardHeroComponent {
  @Input() testInfo: any;
}
