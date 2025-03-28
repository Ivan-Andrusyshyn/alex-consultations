import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { ConsultationFormComponent } from '../consultation-form/consultation-form.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    ConsultationFormComponent,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatDialogClose,
    SocialLinksComponent,
    ConsultationFormComponent,
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
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+380\d{9}$/),
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm() {
    if (this.formGroup.valid) {
      return this.formGroup.value;
    } else {
      return null;
    }
  }
}
