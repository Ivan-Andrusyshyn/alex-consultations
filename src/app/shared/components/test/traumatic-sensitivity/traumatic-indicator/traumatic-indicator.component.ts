import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { SensitivityCategory, sensitivityTest } from './sensitivity-category';
import { TraumaticSensitivityService } from '../../../../../core/services/traumatic-sensitivity.service';

@Component({
  selector: 'app-traumatic-indicator',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, MatExpansionModule],
  templateUrl: './traumatic-indicator.component.html',
  styleUrl: './traumatic-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TraumaticResultsIndicatorComponent implements OnInit {
  private traumaticSensitivityService = inject(TraumaticSensitivityService);
  @Input() scorePercentages: any;
  scoreKeys!: string[];
  readonly panelOpenState = signal(false);
  sensitivityCategory!: Record<string, SensitivityCategory>;
  panelOpenStates: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.sensitivityCategory = sensitivityTest;
    this.scoreKeys = this.traumaticSensitivityService.getScoreKeys();
  }
  togglePanel(key: string) {
    this.panelOpenStates[key] = !this.panelOpenStates[key];
  }
  getDescriptions(score: string): string {
    return this.traumaticSensitivityService.getResultsDescriptions(score);
  }

  parseIntProc(proc: number) {
    return parseInt(proc.toString());
  }
}
