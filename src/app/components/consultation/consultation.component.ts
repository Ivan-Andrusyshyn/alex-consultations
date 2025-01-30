import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss',
})
export class ConsultationComponent {
  @Output() openDialog = new EventEmitter();

  openDialogConflations() {
    this.openDialog.emit();
  }
}
