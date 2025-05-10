import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { debounceTime, map, pairwise, startWith } from 'rxjs/operators';

@Directive({
  selector: '[appStickyHeader]',
  standalone: true,
})
export class StickyHeaderDirective {
  @Input() stickyClass: string = 'sticky-header';
  @Input() offset: number = 100;
  private destroyRef = inject(DestroyRef);
  private renderer = inject(Renderer2);
  lastY = window.scrollY;
  private hasSticky = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    fromEvent(window, 'scroll')
      .pipe(
        debounceTime(20),
        map(() => window.scrollY),
        pairwise(),
        map(([prev, next]) => ({
          isScrollingUp: next < prev,
          isAboveOffset: next > this.offset,
        })),
        startWith({ isScrollingUp: true, isAboveOffset: false }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ isScrollingUp, isAboveOffset }) => {
        if (!isAboveOffset) {
          this.renderer.removeClass(this.el.nativeElement, this.stickyClass);
          this.renderer.removeClass(this.el.nativeElement, 'hidden');
          return;
        }

        if (isScrollingUp) {
          this.renderer.addClass(this.el.nativeElement, this.stickyClass);
          this.renderer.removeClass(this.el.nativeElement, 'hidden');
          this.hasSticky = true;
        } else {
          this.renderer.addClass(this.el.nativeElement, 'hidden');
          this.hasSticky = false;
        }
      });
  }
}
