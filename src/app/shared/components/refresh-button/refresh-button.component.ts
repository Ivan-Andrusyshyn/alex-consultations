import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-refresh-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './refresh-button.component.html',
  styleUrl: './refresh-button.component.scss',
})
export class RefreshButtonComponent {
  @Output() refreshTest = new EventEmitter();

  refresh() {
    this.refreshTest.emit();
  }
}
