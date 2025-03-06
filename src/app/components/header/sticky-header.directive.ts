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
  @Input() stickyClass: string = 'sticky-header'; // По умолчанию класс sticky-header
  @Input() offset: number = 100; // Высота прокрутки перед активацией липкости

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > this.offset) {
      this.renderer.addClass(this.el.nativeElement, this.stickyClass);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.stickyClass);
    }
  }
}
