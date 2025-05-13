import { PercentPipe } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  scrollPercentage: number = 0;
  isShow = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const docHeight = document.documentElement.scrollTop;

    this.isShow.update((prev) => {
      if (docHeight > 70) {
        return true;
      } else {
        return false;
      }
    });
    const scrollOffset =
      window.scrollY || docHeight || document.body.scrollTop || 0;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    this.scrollPercentage = (scrollOffset - 10) / windowHeight;
  }
}
