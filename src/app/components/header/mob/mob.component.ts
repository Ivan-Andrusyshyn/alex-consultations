import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import { HeaderService } from '../../../shared/services/header.service';

import { ToggleBtnComponent } from '../../toggle-btn/toggle-btn.component';
import { UserPersonalityCardComponent } from '../../user-personality-card/user-personality-card.component';
import { PersonalitiesPhraseService } from '../../../shared/services/personalities-phrase.service';
import { UsersPhraseSubject } from '../../../shared/types/16-personalities';

@Component({
  selector: 'app-mob',
  standalone: true,
  imports: [
    NgIf,
    UserPersonalityCardComponent,
    ToggleBtnComponent,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './mob.component.html',
  styleUrl: './mob.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobComponent implements OnInit {
  private headerService = inject(HeaderService);
  isMenuOpen$!: Observable<boolean>;
  hiddenRoutes: boolean = true;
  private readonly personalitiesPhrasesService = inject(
    PersonalitiesPhraseService
  );
  usersPhrase$!: Observable<UsersPhraseSubject | null>;

  ngOnInit(): void {
    this.usersPhrase$ =
      this.personalitiesPhrasesService.getUsersPhraseObservable();
    this.isMenuOpen$ = this.headerService.isMobMenuOpen$;
  }
  toggleMenu() {
    this.headerService.toggleMenu();
  }
}
