import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';

import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private viewportScroller = inject(ViewportScroller);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.seoService.updateTitle('Політика конфіденційності');

    this.seoService.updateMetaTags(
      'Дізнайся, як ми збираємо, зберігаємо та обробляємо твої персональні дані після проходження тесту 16 типів особистості. Прозорість і безпека — наш пріоритет.',
      'політика конфіденційності, персональні дані, обробка даних, безпека даних, тест особистості, mbti, психологічний тест'
    );
    this.viewportScroller.scrollToPosition([0, 0]);

    this.formGroup = this.fb.group({
      consent: [false, Validators.requiredTrue],
    });
  }
}
