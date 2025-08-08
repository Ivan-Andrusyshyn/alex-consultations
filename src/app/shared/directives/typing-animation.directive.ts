import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypingAnimation]',
  standalone: true,
})
export class TypingAnimationDirective implements OnInit {
  @Input('appTypingAnimation') text = ''; // Текст, который печатаем
  @Input() typingSpeed = 50; // Скорость в мс

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.startTyping();
  }

  private startTyping() {
    let index = 0;
    this.el.nativeElement.textContent = '';

    const typingInterval = setInterval(() => {
      if (index < this.text.length) {
        this.el.nativeElement.textContent += this.text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, this.typingSpeed);
  }
}
