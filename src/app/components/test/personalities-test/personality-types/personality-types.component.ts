import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import personalityTypes from './personalityTypes';

@Component({
  selector: 'app-personality-types',
  standalone: true,
  imports: [NgFor],
  templateUrl: './personality-types.component.html',
  styleUrl: './personality-types.component.scss',
})
export class PersonalityTypesComponent {
  personalityTypesArray: { type: string; name: string; urlImg: string }[] =
    personalityTypes;
}
