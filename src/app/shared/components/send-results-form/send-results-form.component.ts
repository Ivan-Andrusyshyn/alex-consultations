import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-send-results-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './send-results-form.component.html',
  styleUrl: './send-results-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendResultsFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Output() sendResultsOnEmail = new EventEmitter<{ email: 'string' }>();
  @Output() toggleSendForm = new EventEmitter<void>();
  sendResultsForm!: FormGroup;

  ngOnInit(): void {
    this.sendResultsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const results = this.sendResultsForm.value;
    this.sendResultsOnEmail.emit(results);
    this.sendResultsForm.reset();
  }

  cancelForm() {
    this.sendResultsForm.reset();
    this.toggleSendForm.emit();
  }
}
