import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConsultationFormComponent } from '../consultation-form/consultation-form.component';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { ModalSocialLinksComponent } from '../modal-social-links/modal-social-links.component';
import { CountingClicksService } from '../../shared/services/counting-clicks.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogContent,
    ConsultationFormComponent,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
    FeedbackFormComponent,
    ModalSocialLinksComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data: any = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      socialMedia: [
        '',
        [
          Validators.required,
          Validators.pattern(/^@[a-zA-Z0-9_]{4,29}$/),
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
  closeModalOnClick() {
    this.dialogRef.close(true);
  }
  onConfirm() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    } else {
      this.formGroup.get('socialMedia')?.setErrors({ pattern: true });
    }
  }
}
