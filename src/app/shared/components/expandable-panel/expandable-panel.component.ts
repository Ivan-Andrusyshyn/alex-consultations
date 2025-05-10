import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-expandable-panel',
  standalone: true,
  imports: [NgIf],
  templateUrl: './expandable-panel.component.html',
  styleUrl: './expandable-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ExpandablePanelComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
