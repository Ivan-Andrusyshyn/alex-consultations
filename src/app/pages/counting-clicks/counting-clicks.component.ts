import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

import { CountingClicksService } from '../../shared/services/counting-clicks.service';
import { ActivatedRoute } from '@angular/router';

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
  private activeRoute = inject(ActivatedRoute);

  clicksData$!: Observable<ClickData>;

  ngOnInit(): void {
    this.clicksData$ = this.activeRoute.data.pipe(
      map((data) => {
        const response = data['data'];
        console.log(response);

        return response.allClicksData;
      })
    );
  }
}
