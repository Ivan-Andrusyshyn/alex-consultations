import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';

import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';

@Component({
  selector: 'app-personalities-results',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe],
  templateUrl: './personalities-results.component.html',
  styleUrl: './personalities-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalitiesResultsComponent implements OnInit {
  private readonly personalitiesService = inject(PersonalitiesTestService);

  scoreKeys!: string[];
  scorePercentages$!: Observable<any>;

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
