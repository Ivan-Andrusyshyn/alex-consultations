import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypeInformation } from '../../shared/types/test';

@Component({
  selector: 'app-personalities-type-information',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './personalities-type-information.component.html',
  styleUrl: './personalities-type-information.component.scss',
})
export class PersonalitiesTypeInformationComponent {
  @Input() personInformation!: TypeInformation;
  @Input() personType!: string;
}
