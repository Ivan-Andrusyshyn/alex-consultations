import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-send-form-on-email-btn',
  standalone: true,
  imports: [],
  templateUrl: './send-form-on-email-btn.component.html',
  styleUrl: './send-form-on-email-btn.component.scss',
})
export class SendFormOnEmailBtnComponent {
  @Output() sendForm = new EventEmitter();

  toggleSendForm() {
    this.sendForm.emit();
  }
}
