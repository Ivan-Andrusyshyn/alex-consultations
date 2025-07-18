import { Location, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NotificationService } from '../../../../../core/services/notification.service';
import { TypeResultInformation } from '../../../../models/be-yourself-results';

@Component({
  selector: 'app-personalities-type-information',
  standalone: true,
  imports: [NgIf, NgFor, MatSelectModule, MatFormFieldModule],
  templateUrl: './personalities-type-information.component.html',
  styleUrl: './personalities-type-information.component.scss',
})
export class PersonalitiesTypeInformationComponent implements OnInit {
  @Input() personInformation!: TypeResultInformation;
  @Input() personType!: string;

  private readonly location = inject(Location);
  notificationService = inject(NotificationService);

  ngOnInit(): void {
    if (!this.personInformation) {
      this.location.back();
      this.notificationService.setNotification(
        'Такого типу особистості не знайдено.'
      );
    }
  }

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
