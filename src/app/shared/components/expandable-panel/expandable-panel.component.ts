import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable-panel',
  standalone: true,
  imports: [NgIf, MatIconModule, MatExpansionModule],
  templateUrl: './expandable-panel.component.html',
  styleUrl: './expandable-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandablePanelComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
