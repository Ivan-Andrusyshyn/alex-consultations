import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { StarRatingService } from '../../../core/services/star-rating.service';
import { TestName } from '../../models/tests/common-tests';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgxStarRatingModule, AsyncPipe, NgIf, ReactiveFormsModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent implements OnInit {
  @Input() testName!: TestName | '';

  private destroyRef = inject(DestroyRef);
  private starRatingService = inject(StarRatingService);

  rating$!: Observable<{ rating: any; votes: any }>;
  isVoted = signal(false);
  storageName!: string;
  public form: FormGroup = new FormGroup({
    rating: new FormControl(0),
  });

  ngOnInit(): void {
    this.rating$ = this.starRatingService.getRating(this.testName).pipe(
      map((r) => {
        const roundedRating = Math.round(Number(r.rating));
        return { rating: roundedRating, votes: r.votes };
      }),
      tap((r) => {
        this.getStorageData();
        this.form.setValue({ rating: r.rating }, { emitEvent: false });
      })
    );

    this.form.statusChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => {
          if (this.isVoted()) {
            alert('Ви вже проголосували. Дякуємо за вашу оцінку!');
            return false;
          }
          return true;
        }),
        switchMap(() => this.onRate())
      )
      .subscribe((r) => {
        this.setStorageData();
        //rounded numbers
        const roundedRating = Math.round(Number(r.rating));
        this.form.setValue({ rating: roundedRating }, { emitEvent: false });
      });
  }

  private setStorageData() {
    localStorage.setItem(this.storageName, JSON.stringify(true));
    this.isVoted.set(true);
  }

  private getStorageData() {
    this.storageName = this.testName + '-isVoted';
    const storage = JSON.parse(
      localStorage.getItem(this.storageName) ?? 'false'
    );
    this.isVoted.set(storage);
  }

  private onRate() {
    const newRating = {
      testName: this.testName,
      score: this.form.value.rating,
    };
    return this.starRatingService.addNewRating(newRating);
  }
}
