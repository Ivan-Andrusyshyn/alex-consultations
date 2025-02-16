import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-shine',
  standalone: true,
  imports: [],
  templateUrl: './btn-shine.component.html',
  styleUrl: './btn-shine.component.scss',
})
export class BtnShineComponent {
  @Output() onClick = new EventEmitter<void>();
  @Input() btnTitle: string = 'Результати';

  getClick() {
    this.onClick.emit();
  }
}
