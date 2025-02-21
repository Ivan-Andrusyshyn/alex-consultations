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

  ngOnInit(): void {
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
