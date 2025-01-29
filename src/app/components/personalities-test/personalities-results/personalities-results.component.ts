import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PersonalitiesTestService } from '../../../shared/services/personalities-test.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personalities-results',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe],
  templateUrl: './personalities-results.component.html',
  styleUrl: './personalities-results.component.scss',
})
export class PersonalitiesResultsComponent implements OnInit {
  scoreKeys!: string[];
  scores$!: Observable<{ [key: string]: number }>;
  amountQuestionsInOnType!: Record<string, number>;
  private readonly personalitiesService = inject(PersonalitiesTestService);

  ngOnInit(): void {
    this.amountQuestionsInOnType =
      this.personalitiesService.amountQuestionsInOnType;
    this.scores$ = this.personalitiesService.getObservableScores();
    this.scoreKeys = this.personalitiesService.getScoreKeys();
  }

  useColorByResult(score: string): string {
    return this.personalitiesService.setResultsColors(score);
  }

  getDescriptions(score: string): string {
    return this.personalitiesService.getResultsDescriptions(score);
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
  countPercentage(scores: { [key: string]: number }, type: string) {
    return this.personalitiesService.countPercentage(scores, type);
  }
}
