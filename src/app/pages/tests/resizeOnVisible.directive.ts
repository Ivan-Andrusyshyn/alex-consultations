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
  private scrollTimeout: any;

  @HostListener('window:scroll')
  onScroll(): void {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.handleScrollLogic();
    }, 50);
  }

  private handleScrollLogic() {
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

      const centerY = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceToCenter = Math.abs(centerY - elementCenter);

      if (distanceToCenter > 40) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.scrollY +
            rect.top +
            rect.height / 2 -
            window.innerHeight / 2;

          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth',
          });
        });
      }
    }

    if (!isVisible && this.wasVisible) {
      this.wasVisible = false;
    }
  }
}
