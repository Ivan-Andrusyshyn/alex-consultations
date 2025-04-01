import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

import { ConsultationService } from '../../shared/services/consultation.service';
import { BenefitConsultationData } from '../../shared/types/benefit-consultation';

@Component({
  selector: 'app-consultation-benefit',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, MatExpansionModule],
  templateUrl: './consultation-benefit.component.html',
  styleUrl: './consultation-benefit.component.scss',
})
export class ConsultationBenefitComponent implements OnInit {
  private readonly consultationService = inject(ConsultationService);

  benefitConsultationData$!: Observable<BenefitConsultationData>;
  private panelOpenState = new BehaviorSubject(false);
  panelOpenState$ = this.panelOpenState.asObservable();

  ngOnInit(): void {
    this.benefitConsultationData$ = this.consultationService
      .getBenefitConsultation()
      .pipe(map((r) => r.results));
  }

  togglePanel() {
    this.panelOpenState.next(!this.panelOpenState.value);
  }
}
