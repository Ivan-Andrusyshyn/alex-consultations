import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accent-btn',
  standalone: true,
  imports: [MatButtonModule, MatButton],
  templateUrl: './accent-btn.component.html',
  styleUrl: './accent-btn.component.scss',
})
export class AccentBtnComponent {
  @Output() onClickBtn = new EventEmitter();
  @Input() textBtn: string = 'Записатися';
  @Input() matColor: string = 'primary';

  onClick() {
    this.onClickBtn.emit();
  }
}
