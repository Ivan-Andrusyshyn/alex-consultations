import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './error-list.component.html',
  styleUrl: './error-list.component.scss',
})
export class ErrorListComponent {
  @Output() navigateQuestion = new EventEmitter();
  @Input() errorList!: any[] | null;
  @Input() formIsSubmitted: boolean = false;

  navigateToQuestion(e: any) {
    this.navigateQuestion.emit(e);
  }
}
