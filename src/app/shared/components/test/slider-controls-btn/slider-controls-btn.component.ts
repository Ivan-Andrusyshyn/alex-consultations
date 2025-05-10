import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider-controls-btn',
  standalone: true,
  imports: [],
  templateUrl: './slider-controls-btn.component.html',
  styleUrl: './slider-controls-btn.component.scss',
})
export class SliderControlsBtnComponent {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();
  @Input() controlsInside: boolean = false;

  nextSlide() {
    this.next.emit();
  }

  prevSlide() {
    this.prev.emit();
  }
}
