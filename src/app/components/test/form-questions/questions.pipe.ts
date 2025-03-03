import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionWord',
  standalone: true,
})
export class QuestionWordPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';

    let lastDigit = value % 10;
    let lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return value + ' запитань';
    } else if (lastDigit === 1) {
      return value + ' запитання';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return value + ' запитання';
    } else {
      return value + ' запитань';
    }
  }
}
