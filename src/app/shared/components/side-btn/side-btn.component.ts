import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-btn',
  standalone: true,
  imports: [],
  templateUrl: './side-btn.component.html',
  styleUrl: './side-btn.component.scss',
})
export class SideBtnComponent {
  @Output() onClick = new EventEmitter();
  titleBtn = 'Записатиcя';

  clickBtn() {
    this.onClick.emit();
  }
}
