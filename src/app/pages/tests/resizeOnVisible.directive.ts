import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizeOnVisible]',
  standalone: true,
})
export class ResizeOnVisibleDirective {
  @Input() visibleCards!: boolean[];
  @Input('appResizeOnVisible') index!: number;
  @Input() isMobile: boolean = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isMobile) return;
    //
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / rect.height;

    if (this.visibleCards && typeof this.index === 'number') {
      this.visibleCards[this.index] = percentVisible > 0.5;

      element.style.transition = 'transform 0.3s ease, scale 0.3s ease';
      element.style.transform =
        percentVisible > 0.5 ? 'scale(1)' : 'scale(0.8)';
      element.style.opacity = percentVisible > 0.5 ? '1' : '0.7';
    }
  }
}
