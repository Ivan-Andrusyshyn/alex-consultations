import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slider-controls-btn',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './slider-controls-btn.component.html',
  styleUrl: './slider-controls-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderControlsBtnComponent {
  @Output() next = new EventEmitter();
  @Output() prev = new EventEmitter();

  @Input() disableNext?: boolean = false;
  @Input() disablePrev?: boolean = false;

  @Input() controlsInside: boolean = false;

  nextSlide() {
    this.next.emit();
  }

  prevSlide() {
    this.prev.emit();
  }
}
