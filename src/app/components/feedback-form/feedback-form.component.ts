import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { GoogleSheetsService } from '../../shared/services/google-sheets.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  private readonly googleSheetService = inject(GoogleSheetsService);
  private destroyRef = inject(DestroyRef);
  title = signal(
    'Хочеш глибше зрозуміти себе? Залиши заявку та отримай у подарунок гайд, який допоможе знайти свою пару відповідно до твого типу особистості 🎁'
  );

  isFormSended = signal(false);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.formGroup = this.fb.group({
      socialMedia: [
        '',
        [
          Validators.required,
          Validators.pattern(/^@[a-zA-Z0-9_]{4,29}$/),
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      feedBack: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const userData = this.formGroup.value;
    userData.name = 'Question';
    if (this.formGroup.valid) {
      this.googleSheetService
        .postRegistrationInSheet(userData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          this.formGroup.reset();
          this.isFormSended.set(true);
          this.title.set('Повідомлення успішно надіслане ✅');
        });
    }
  }
}
