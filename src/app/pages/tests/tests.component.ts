import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { RouterLink } from '@angular/router';
import { TestCardStartBtnComponent } from '../../components/test-card-start-btn/test-card-start-btn.component';
import { TestCardInfoBtnComponent } from '../../components/test-card-info-btn/test-card-info-btn.component';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [TestCardStartBtnComponent, TestCardInfoBtnComponent],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {}
