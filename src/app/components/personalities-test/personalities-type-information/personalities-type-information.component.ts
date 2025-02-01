import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TypeInformation } from '../../../shared/types/test';

@Component({
  selector: 'app-personalities-type-information',
  standalone: true,
  imports: [NgIf, NgFor, MatSelectModule, MatFormFieldModule],
  templateUrl: './personalities-type-information.component.html',
  styleUrl: './personalities-type-information.component.scss',
})
export class PersonalitiesTypeInformationComponent {
  @Input() personInformation!: TypeInformation;
  @Input() personType!: string;

  sectionList = [
    { id: 'strengths', label: 'Сильні сторони' },
    { id: 'weaknesses', label: 'Слабкі сторони' },
    { id: 'perception', label: 'Сприйняття' },
    { id: 'relationships', label: 'Взаємовідносини' },
    { id: 'career', label: "Кар'єра" },
  ];

  scrollToSection(sectionId: string | null) {
    if (!sectionId) return;
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
