import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizeOnVisible]',
  standalone: true,
})
export class ResizeOnVisibleDirective {
  @Input() visibleCards!: boolean[];
  @Input('appResizeOnVisible') index!: number;
  @Input() isMobile: boolean = false;

  private wasVisible = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();

    if (!this.isMobile) {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
      return;
    }
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / rect.height;

    const isVisible = percentVisible > 0.5;

    if (this.visibleCards && typeof this.index === 'number') {
      this.visibleCards[this.index] = isVisible;
    }

    element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    element.style.transform = isVisible ? 'scale(1)' : 'scale(0.8)';
    element.style.opacity = isVisible ? '1' : '0.7';

    if (isVisible && !this.wasVisible) {
      this.wasVisible = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (!isVisible && this.wasVisible) {
      this.wasVisible = false;
    }
  }
}
