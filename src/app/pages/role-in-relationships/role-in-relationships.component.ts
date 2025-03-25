import { Component, inject, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { RouteTrackerService } from '../../shared/services/route-tracker.service';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-role-in-relationships',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './role-in-relationships.component.html',
  styleUrl: './role-in-relationships.component.scss',
})
export class RoleInRelationshipsComponent implements OnInit {
  private seoService = inject(SeoService);
  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Тест Твоя роль у стосунках?  | Дізнайся більше про себе'
    );
    this.seoService.updateMetaTags(
      'Пройди тест і дізнайся, яка твоя роль у стосунках. Відкрий свої сильні сторони, стиль спілкування та особливості характеру у взаєминах.',
      'тест, роль у стосунках, психологія, стосунки, саморозвиток, типи особистості, MBTI'
    );
  }
}
