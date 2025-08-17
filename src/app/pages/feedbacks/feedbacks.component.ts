import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
//

//
import {
  Feedback,
  TestsFeedbackService,
} from '../../core/services/feedback/tests-feedback.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
})
export class FeedbacksComponent implements OnInit {
  private testFeedbacksService = inject(TestsFeedbackService);

  feedbacksList$!: Observable<Feedback[]>;

  ngOnInit(): void {
    this.feedbacksList$ = this.testFeedbacksService
      .getAllTestsFeedback()
      .pipe(map((response) => response.feedbacks));
  }
}
