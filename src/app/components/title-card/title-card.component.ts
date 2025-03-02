import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-card',
  standalone: true,
  imports: [],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  @Input() titleText!: string;
  @Input() subtitleText!: string;
  @Input() imgUrl!: string;
}
