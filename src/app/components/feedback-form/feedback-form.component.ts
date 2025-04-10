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
import { GoogleSheetsService } from '../../shared/services/google-sheets.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, NgIf, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  private readonly googleSheetService = inject(GoogleSheetsService);
  private destroyRef = inject(DestroyRef);
  title = signal('Дуже цікаво дізнатись твій результат ❤️');
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
    if (this.formGroup.valid) {
      this.googleSheetService
        .postSheetsTestsFeedBack(this.formGroup.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          this.formGroup.reset();
          this.title.set('Повідомлення успішно відправлене ✅');
        });
    }
  }
}
