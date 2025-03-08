import { Component, inject } from '@angular/core';
import { RouteTrackerService } from '../../shared/services/route-tracker.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  private routeTracker = inject(RouteTrackerService);
  constructor() {
    this.routeTracker.getRoutes();
  }
}
