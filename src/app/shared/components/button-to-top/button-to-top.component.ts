import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-to-top',
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: './button-to-top.component.html',
  styleUrl: './button-to-top.component.scss',
})
export class ButtonToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrolledFromTop = scrollTop > 1200;
    const scrolledFromBottom =
      documentHeight - (scrollTop + windowHeight) > 300;

    this.isVisible = scrolledFromTop && scrolledFromBottom;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
