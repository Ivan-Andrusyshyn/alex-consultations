import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryBtnComponent } from '../../shared/components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PrimaryBtnComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private route: Router) {}
  goBack() {
    this.route.navigateByUrl('/');
  }
}
