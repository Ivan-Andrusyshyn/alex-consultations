import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss',
})
export class ConsultationComponent {}
