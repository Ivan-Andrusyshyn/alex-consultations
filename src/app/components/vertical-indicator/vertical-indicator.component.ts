import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-indicator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vertical-indicator.component.html',
  styleUrl: './vertical-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalIndicatorComponent implements OnInit {
  @Input() value: number = 1;
  controller = new FormControl({ value: this.value, disabled: true });
  ngOnInit(): void {
    this.controller.setValue(this.value, { emitEvent: false });
    this.updateColor();
  }
  updateColor() {
    const color = this.getColor(this.value);
    document.documentElement.style.setProperty('--level-color', color);
  }
  getColor(value: number): string {
    if (value < 3) return '#92ff77';
    if (value < 5) return '#ffd700';
    if (value < 8) return '#ff8c00';
    return '#ff5733';
  }
}
