import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SeoService } from '../../core/services/seo.service';
import { ResponseData } from './data.interface';

@Injectable()
export class ResultService {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  getSubCategoryName(type: string): number {
    if (type === 'Слабо заварена') {
      return 83;
    }
    if (type === 'Смак починає звучати') {
      return 69;
    }
    if (type === 'Розкритий аромат') {
      return 47;
    }
    if (type === 'Фірмова подача') {
      return 18;
    } else {
      return 18;
    }
  }

  updatePageSeo(response: ResponseData) {
    this.seoService.updateTitle(response.seo.title);

    this.seoService.updateMetaTags(
      response.seo.metaTags[0],
      response.seo.metaTags[1]
    );

    this.seoService.updateOgTags({
      title: response.results.title,
      description: response.results.subtitle,
      url: window.location.href,
    });
  }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      socialMedia: [
        '',
        [
          Validators.required,
          Validators.pattern(/^@[a-zA-Z0-9_]{4,29}$/),
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        '',
        [
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }
}
