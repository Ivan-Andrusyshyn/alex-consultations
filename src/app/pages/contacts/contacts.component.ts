import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { fadeInAnimation } from '../../core/animations/fadeIn-animation';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, SocialLinksComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ContactsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private routeTracker = inject(RouteTrackerService);

  classLinks = 'contacts';
  contactForm!: FormGroup;
  ngOnInit(): void {
    this.routeTracker.getRoutes();

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
