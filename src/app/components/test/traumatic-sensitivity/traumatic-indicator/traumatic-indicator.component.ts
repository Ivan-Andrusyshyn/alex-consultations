import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { TraumaticSensitivityService } from '../../../../shared/services/traumatic-sensitivity.service';
import { TestResult } from '../../../../shared/types/traumatic-sensitivity';

@Component({
  selector: 'app-traumatic-indicator',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe],
  templateUrl: './traumatic-indicator.component.html',
  styleUrl: './traumatic-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraumaticResultsIndicatorComponent implements OnInit {
  private traumaticSensitivityService = inject(TraumaticSensitivityService);

  scoreKeys!: Array<keyof TestResult>;

  scorePercentages$!: Observable<TestResult | null>;

  ngOnInit(): void {
    this.scorePercentages$ =
      this.traumaticSensitivityService.getObservableScorePercentages();

    this.scoreKeys = this.traumaticSensitivityService.getScoreKeys();
  }

  getDescriptions(score: string): string {
    return this.traumaticSensitivityService.getResultsDescriptions(score);
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
}
