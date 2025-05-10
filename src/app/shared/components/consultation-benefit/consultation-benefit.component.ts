import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { ConsultationService } from '../../../core/services/consultation.service';
import { BenefitConsultationData } from '../../models/benefit-consultation';

@Component({
  selector: 'app-consultation-benefit',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgFor,
    MatButtonModule,
    AsyncPipe,
    MatExpansionModule,
  ],
  templateUrl: './consultation-benefit.component.html',
  styleUrl: './consultation-benefit.component.scss',
})
export class ConsultationBenefitComponent implements OnInit {
  private readonly consultationService = inject(ConsultationService);

  benefitConsultationData$!: Observable<BenefitConsultationData>;
  panelOpenState = false;

  ngOnInit(): void {
    this.benefitConsultationData$ = this.consultationService
      .getBenefitConsultation()
      .pipe(map((r) => r.results));
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
}
