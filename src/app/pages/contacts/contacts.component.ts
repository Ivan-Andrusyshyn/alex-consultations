import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  contactForm!: FormGroup;
  isClicked = signal(false);

  setByClick() {
    this.isClicked.set(true);
  }

  ngOnInit(): void {
    if (window.innerWidth < 764) {
      this.isClicked.set(true);
    } else {
      this.isClicked.set(false);
    }
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  onSubmit() {
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
  }
}
