import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  standalone: true,
  imports: [],
  templateUrl: './secondary-btn.component.html',
  styleUrl: './secondary-btn.component.scss',
})
export class SecondaryBtnComponent {
  @Output() onClick = new EventEmitter<void>();
  @Input() btnTitle: string = 'Результати';

  getClick() {
    this.onClick.emit();
  }
}
