import { PercentPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
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

  onWindowScroll() {
    const docHeight = document.documentElement.scrollTop;

    const scrollOffset =
      window.scrollY || docHeight || document.body.scrollTop || 0;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    this.isShow.update((prev) => docHeight > 70);

    this.scrollPercentage = scrollOffset / this.scrollContainerNumber();
  }
}
