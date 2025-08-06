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
    this.isVisible = window.scrollY > 700;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
