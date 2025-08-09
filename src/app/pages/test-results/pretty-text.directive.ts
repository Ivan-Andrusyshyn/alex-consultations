import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrettyText]',
  standalone: true,
})
export class PrettyTextDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    // Чистим лишние пробелы (и переносы строк)
    let text = element.innerHTML.replace(/\s+/g, ' ').trim();
    this.renderer.setProperty(element, 'innerHTML', text);

    // Стили для красивого текста
    this.renderer.setStyle(element, 'text-align', 'justify');
    this.renderer.setStyle(element, 'text-align-last', 'start'); // последняя строка не растягивается
    this.renderer.setStyle(element, 'hyphens', 'auto'); // автоматические переносы слов
    this.renderer.setStyle(element, 'word-break', 'break-word'); // перенос очень длинных слов
    this.renderer.setStyle(element, 'overflow-wrap', 'break-word');
    this.renderer.setStyle(element, 'line-height', '1.6'); // чуть увеличим межстрочный интервал
  }
}
