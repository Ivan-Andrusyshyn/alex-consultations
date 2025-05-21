import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(description: string, keywords: string) {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  updateOgTags({
    title,
    description,
    url,
  }: {
    title: string;
    description: string;
    url: string;
  }) {
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'og:url', content: url });
  }
}
