import { PercentPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements AfterViewInit {
  @Input() scrollContainer!: HTMLElement;
  @Input() isFirstNotification: boolean = false;
  @Output() showSuccess = new EventEmitter<boolean>();

  scrollPercentage: number = 0;
  private scrollContainerNumber = signal<number>(0);
  isShow = signal(false);

  ngAfterViewInit(): void {
    this.updateOffsetTop();
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowEvent() {
    this.updateOffsetTop();
    this.onWindowScroll();
  }

  private updateOffsetTop() {
    if (this.scrollContainer) {
      this.scrollContainerNumber.set(this.scrollContainer.offsetTop);
    }
  }
  get currentTranslateX(): string {
    return (
      'translateX(' + Math.max(0, 100 - this.scrollPercentage * 100) + '%)'
    );
  }
  onWindowScroll() {
    const docHeight = document.documentElement.scrollTop;

    const scrollOffset =
      window.scrollY || docHeight || document.body.scrollTop || 0;

    this.isShow.update((prev) => docHeight > 70);

    this.scrollPercentage = scrollOffset / this.scrollContainerNumber();

    if (this.scrollPercentage >= 1 && !this.isFirstNotification) {
      this.showSuccess.emit(true);
    }
  }
}
