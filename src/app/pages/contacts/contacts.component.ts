import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';

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
  private routeTracker = inject(RouteTrackerService);
  constructor() {
    this.routeTracker.getRoutes();
  }

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
