import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-accent-btn',
  standalone: true,
  imports: [],
  templateUrl: './accent-btn.component.html',
  styleUrl: './accent-btn.component.scss',
})
export class AccentBtnComponent {
  @Output() onClickBtn = new EventEmitter();

  onClick() {
    this.onClickBtn.emit();
  }
}
