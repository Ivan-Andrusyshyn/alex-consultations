import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionWord',
  standalone: true,
})
export class QuestionWordPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value < 0) return '';

    if (value === 1) return `${value} запитання`;
    if (value >= 2 && value <= 4) return `${value} запитання`;
    return `${value} запитань`;
  }
}
