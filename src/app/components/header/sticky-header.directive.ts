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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.offset && scrollTop < this.lastScrollTop) {
      this.renderer.addClass(this.el.nativeElement, this.stickyClass);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.stickyClass);
    }

    this.lastScrollTop = scrollTop;
  }
}
