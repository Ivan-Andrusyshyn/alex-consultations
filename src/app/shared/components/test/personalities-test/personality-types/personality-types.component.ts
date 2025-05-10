import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PersonalityTypes } from '../../../../models/16-personalities';
import { personalityTypesContent } from '../../../../../../assets/content/16-personalities/personalityTypes';

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
