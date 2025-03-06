import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStickyHeader]',
  standalone: true,
})
export class StickyHeaderDirective {
  @Input() stickyClass: string = 'sticky-header';
  @Input() offset: number = 100;

  private lastScrollTop = 0;
  private isScrollingDown = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.isScrollingDown = true;
    } else {
      this.isScrollingDown = false;
    }

    if (scrollTop > this.offset) {
      if (this.isScrollingDown) {
        this.renderer.addClass(this.el.nativeElement, this.stickyClass);
        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          'translateY(-100%)'
        );
      } else {
        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          'translateY(0)'
        );
      }
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.stickyClass);
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        'translateY(0)'
      );
    }

    this.lastScrollTop = scrollTop;
  }
}
