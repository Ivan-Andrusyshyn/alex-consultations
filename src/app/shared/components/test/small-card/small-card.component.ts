import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
//

//
import { CardContent } from '../../../models/tests/common-tests';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryBtnComponent } from '../../primary-btn/primary-btn.component';

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [PrimaryBtnComponent, NgIf, MatIconModule],

  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCardComponent {
  @Input() card!: CardContent;

  private router = inject(Router);
  currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  isMobile: boolean = window.innerWidth < 764;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    if (this.intervalId || !this.card?.imgList?.length) return;

    this.intervalId = setInterval(() => {
      this.currentIndex.update((prev) => (prev + 1) % this.card.imgList.length);
    }, 3000);
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startTest(): void {
    this.router.navigateByUrl(this.card.routeStart);
  }
}
