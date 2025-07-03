import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PersonalityTypes } from '../../../../models/be-yourself';
import { personalityTypesContent } from '../../../../../../assets/content/be-yourself/personalityTypes';

@Component({
  selector: 'app-personality-types',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './personality-types.component.html',
  styleUrl: './personality-types.component.scss',
})
export class PersonalityTypesComponent {
  personalityTypesArray: PersonalityTypes[] = personalityTypesContent;
}
