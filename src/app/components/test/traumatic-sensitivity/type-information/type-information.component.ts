import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TypeInformation } from '../../../../shared/types/traumatic-sensitivity';

@Component({
  selector: 'app-type-information',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './type-information.component.html',
  styleUrl: './type-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeInformationComponent {
  @Input() typeInfo!: TypeInformation;
}
