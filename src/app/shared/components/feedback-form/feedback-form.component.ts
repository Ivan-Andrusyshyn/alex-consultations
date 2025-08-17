import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';

//
import { TestsFeedbackService } from '../../../core/services/feedback/tests-feedback.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestName } from '../../models/tests/common-tests';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent implements OnInit {
  testsFeedbackService = inject(TestsFeedbackService);
  //

  @Input() testName!: TestName;
  private dr = inject(DestroyRef);
  //

  //
  feedback = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  showForm = signal(true);
  successRespMessage = signal(false);

  ngOnInit(): void {
    const stored = localStorage.getItem('tests-feedback');
    const feedbacks = stored ? JSON.parse(stored) : {};
    if (feedbacks[this.testName]) {
      this.showForm.set(false);
    }
  }
  //
 

  //
  onSubmit() {
    if (this.feedback.valid) {
      const feedbackMessage = this.feedback.value as string;
      this.testsFeedbackService
        .createTestsFeedback(feedbackMessage, this.testName)
        .pipe(takeUntilDestroyed(this.dr))
        .subscribe((r) => {
          this.successRespMessage.set(true);
          this.showForm.set(false);
          this.setStorageFeedbackList();
        });
    }
  }

  private setStorageFeedbackList() {
    const stored = localStorage.getItem('tests-feedback');
    const feedbacks = stored ? JSON.parse(stored) : {};

    feedbacks[this.testName] = true;

    localStorage.setItem('tests-feedback', JSON.stringify(feedbacks));
  }
}
