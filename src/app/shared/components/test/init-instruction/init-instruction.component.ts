import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SecondaryBtnComponent } from '../../secondary-btn/secondary-btn.component';

@Component({
  selector: 'app-init-instruction',
  standalone: true,
  imports: [SecondaryBtnComponent],
  templateUrl: './init-instruction.component.html',
  styleUrl: './init-instruction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitInstructionComponent {}
