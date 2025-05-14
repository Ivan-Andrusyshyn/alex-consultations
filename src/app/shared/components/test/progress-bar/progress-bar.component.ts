import { PercentPipe } from '@angular/common';
import { Component, HostListener, Input, signal } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() scrollContainerNumber!: number;

  scrollPercentage: number = 0;
  isShow = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const docHeight = document.documentElement.scrollTop;

    this.isShow.update((prev) => docHeight > 70);

    const scrollOffset =
      window.scrollY || docHeight || document.body.scrollTop || 0;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    this.scrollPercentage = scrollOffset / this.scrollContainerNumber;
  }
}
