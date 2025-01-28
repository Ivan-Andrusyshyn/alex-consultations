import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
  scoreKeys: any;
  scores$!: Observable<{ [key: string]: number }>;

  private readonly personalitiesService = inject(PersonalitiesTestService);

  ngOnInit(): void {
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
}
