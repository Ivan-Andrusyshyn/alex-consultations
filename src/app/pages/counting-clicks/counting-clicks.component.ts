import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

import { CountingClicksService } from '../../shared/services/counting-clicks.service';

type AllowedClickKeys = 'telegram' | 'instagram';

type ClickData = {
  [K in AllowedClickKeys]: { amountClick: number };
};

@Component({
  selector: 'app-counting-clicks',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './counting-clicks.component.html',
  styleUrl: './counting-clicks.component.scss',
})
export class CountingClicksComponent implements OnInit {
  private countingService = inject(CountingClicksService);

  clicksData$!: Observable<ClickData>;

  ngOnInit(): void {
    this.clicksData$ = this.countingService
      .getCountingClicksInSocialLinks()
      .pipe(
        map((r) => r.allClicksData),
        tap((r) => {
          console.log(r);
        })
      );
  }
}
