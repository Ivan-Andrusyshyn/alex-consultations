import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { interval, switchMap, tap, timeout } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { personalityTypesContent } from '../../../../../../assets/content/16-personalities/personalityTypes';

@Component({
  selector: 'app-icons-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './icons-list.component.html',
  styleUrl: './icons-list.component.scss',
})
export class IconsListComponent {
  personalitiesTypes = personalityTypesContent;
  private destroyRef = inject(DestroyRef);
  private isMouseDown = false;

  @ViewChild('scrollList') scrollListRef!: ElementRef<HTMLUListElement>;

  activeIndex = signal(0);

  ngOnInit() {
    interval(1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          if (!this.isMouseDown) {
            const activeIndex =
              (this.activeIndex() + 1) % this.personalitiesTypes.length;
            this.activeIndex.set(activeIndex);
            this.scrollToActiveItem();
          }
        })
      )
      .subscribe();
  }

  setActiveItem(index: number) {
    this.isMouseDown = true;
    this.activeIndex.set(index);
  }

  private scrollToActiveItem() {
    const list = this.scrollListRef?.nativeElement;
    if (!list) return;

    const activeItem = list.children[this.activeIndex()] as HTMLElement; // Приводим к нужному типу

    const offset =
      activeItem.offsetLeft + activeItem.offsetWidth / 2 - list.offsetWidth / 2;

    list.scrollTo({
      left: offset,
      behavior: 'smooth',
    });
  }

  onMouseUp() {
    this.isMouseDown = false;
  }
}
