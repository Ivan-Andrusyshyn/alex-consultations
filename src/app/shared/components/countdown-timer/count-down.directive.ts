import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
  inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { interval, takeWhile, Subscription } from 'rxjs';

@Directive({
  selector: '[countdown]',
  standalone: true,
})
export class CountDownTimerDirective implements OnInit, OnDestroy {
  @Input('localStorageRestore') storageKey!: string;
  @Output() timerFinished = new EventEmitter<void>();

  private chr = inject(ChangeDetectorRef);
  private timerSubscription?: Subscription;

  countdownTime = 15 * 60;
  remainingTime = this.countdownTime;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.restoreTime();
    this.startCountdown();

    window.addEventListener('beforeunload', this.saveTime);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.saveTime();
    window.removeEventListener('beforeunload', this.saveTime);
  }

  startCountdown(): void {
    this.updateDisplay();

    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.remainingTime > 0))
      .subscribe({
        next: () => {
          this.remainingTime--;
          this.updateDisplay();
        },
        complete: () => {
          this.onTimerEnd();
        },
      });
  }

  updateDisplay() {
    const formatted = this.formatTime(this.remainingTime);
    this.el.nativeElement.innerText = formatted;
    this.chr.markForCheck();
    this.saveTime();
  }

  saveTime = () => {
    const formatted = this.formatTime(this.remainingTime);
    sessionStorage.setItem(this.storageKey, formatted);
  };

  onTimerEnd() {
    this.el.nativeElement.innerText = 'Час вичерпано ⏰';
    this.saveTime();
    this.timerFinished.emit();
  }
  restoreTime() {
    const saved = sessionStorage.getItem(this.storageKey);
    if (saved !== null) {
      const seconds = this.parseTime(saved);
      if (seconds > 0 && seconds <= this.countdownTime) {
        this.remainingTime = seconds;
      }
    }
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  parseTime(timeStr: string): number {
    const parts = timeStr.split(':');
    if (parts.length !== 2) return this.countdownTime;
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (isNaN(minutes) || isNaN(seconds)) return this.countdownTime;
    return minutes * 60 + seconds;
  }
}
