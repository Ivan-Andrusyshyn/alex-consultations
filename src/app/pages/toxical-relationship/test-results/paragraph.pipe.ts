import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraph',
  standalone: true,
})
export class ParagraphPipe implements PipeTransform {
  transform(text: string, length: number = 250): string {
    if (!text) return '';

    return (
      text
        .match(new RegExp(`.{1,${length}}`, 'g'))
        ?.map((paragraph) => `<p class="description">${paragraph.trim()}</p>`)
        .join('') || ''
    );
  }
}
