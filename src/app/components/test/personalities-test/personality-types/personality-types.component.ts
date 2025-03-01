import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import personalityTypes from './personalityTypes';
import { PersonalityTypes } from '../../../../shared/types/16-personalities';

@Component({
  selector: 'app-personality-types',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './personality-types.component.html',
  styleUrl: './personality-types.component.scss',
})
export class PersonalityTypesComponent {
  personalityTypesArray: PersonalityTypes[] = personalityTypes;
}
