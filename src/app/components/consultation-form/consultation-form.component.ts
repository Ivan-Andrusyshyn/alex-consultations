import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, NgIf, ReactiveFormsModule],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.scss',
})
export class ConsultationFormComponent {
  @Input() formGroup!: FormGroup;
}
