import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { PersonalitiesTestService } from '../../../../../core/services/be-yourself.service';
import { TestResult } from '../../../../models/be-yourself';

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
  getPieChartStyle(scorePercentages: Record<string, number>): string {
    let gradient = '';
    let currentAngle = 0;
    const colors: Record<string, string> = {
      key1: '#ff5733',
      key2: '#33ff57',
      key3: '#3357ff',
      key4: '#ff33a8',
    };

    Object.keys(scorePercentages).forEach((key) => {
      const percentage = scorePercentages[key];
      const nextAngle = currentAngle + percentage * 3.6; // 1% = 3.6 градуса
      gradient += `${colors[key]} ${currentAngle}deg ${nextAngle}deg, `;
      currentAngle = nextAngle;
    });

    return `conic-gradient(${gradient.slice(0, -2)})`;
  }
}
