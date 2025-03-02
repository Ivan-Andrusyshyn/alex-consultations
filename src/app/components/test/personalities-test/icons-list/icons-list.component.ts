import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { personalityTypesContent } from '../../../../../assets/content/16-personalities/personalityTypes';

@Component({
  selector: 'app-icons-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './icons-list.component.html',
  styleUrl: './icons-list.component.scss',
})
export class IconsListComponent {
  personalitiesTypes = personalityTypesContent;
}
