import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { TestResult } from '../../../../shared/types/16-personalities';
import { PersonalitiesTestService } from '../../../../shared/services/personalities-test.service';

@Component({
  selector: 'app-results-indicator',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe],
  templateUrl: './results-indicator.component.html',
  styleUrl: './results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsIndicatorComponent implements OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);

  scoreKeys!: Array<keyof TestResult>;

  scorePercentages$!: Observable<TestResult | null>;
  ngOnInit(): void {
    this.scorePercentages$ =
      this.personalitiesService.getObservableScorePercentages();

    this.scoreKeys = this.personalitiesService.getScoreKeys();
  }

  getDescriptions(score: string): string {
    return this.personalitiesService.getResultsDescriptions(score);
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
}
