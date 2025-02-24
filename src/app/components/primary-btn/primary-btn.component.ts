import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.scss',
})
export class PrimaryBtnComponent {
  @Output() openDialog = new EventEmitter();

  openDialogConflations() {
    this.openDialog.emit();
  }
}
