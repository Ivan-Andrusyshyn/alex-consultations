import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss',
})
export class ConsultationsComponent {}
