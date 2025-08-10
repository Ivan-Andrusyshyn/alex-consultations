import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeightOnVisible]',
  standalone: true,
})
export class HeightOnVisibleDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const distanceToBottom = window.innerHeight - rect.bottom;

    if (distanceToBottom <= 400) {
      this.el.nativeElement.style.display = 'none';
    } else {
      this.el.nativeElement.style.display = 'flex';
    }
  }
}
