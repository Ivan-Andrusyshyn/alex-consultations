import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouteTrackerService } from '../../core/services/route-tracker.service';
import { SeoService } from '../../core/services/seo.service';
import { TitleCardComponent } from '../../shared/components/title-card/title-card.component';

@Component({
  selector: 'app-attractiveness',
  standalone: true,
  imports: [TitleCardComponent, RouterOutlet],
  templateUrl: './attractiveness.component.html',
  styleUrl: './attractiveness.component.scss',
})
export class AttractivenessComponent {
  imgUrl = 'assets/imgs/person-peautiful.png';
  subtitleText =
    'Цей тест створений не для того, щоб поставити тебе в рамки, а навпаки — щоб показати твою природну силу, яка вже в тобі є.';
  titleText = 'Що робить тебе по-справжньому привабливим?';

  private seoService = inject(SeoService);

  private routeTracker = inject(RouteTrackerService);

  ngOnInit(): void {
    this.routeTracker.getRoutes();

    this.seoService.updateTitle(
      'Тест: Що робить тебе по-справжньому привабливим?'
    );
    this.seoService.updateMetaTags(
      'Дізнайся, у чому твоя природна сила та унікальна привабливість! Пройди тест і відкрий свої найсильніші сторони, які роблять тебе особливим.',
      'тест на привабливість, що робить мене привабливим, особистісні якості, природна харизма, самопізнання, впевненість, внутрішня сила, психологія привабливості'
    );
  }
}
