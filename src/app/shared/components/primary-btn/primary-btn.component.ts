import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.scss',
})
export class PrimaryBtnComponent {
  @Output() onClick = new EventEmitter();

  @Input() isPulsationAnimation?: boolean = false;
  @Input() classColor: 'dark-btn' | 'red-btn' = 'dark-btn';
  @Input() textBtn: string = 'Запис на консультацію';
  @Input() isDisabled?: boolean = false;
  click() {
    this.onClick.emit();
  }
}
