import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

import {
  PersonalityDayPhrases,
  UsersPhraseSubject,
} from '../../../shared/models/personalities-phrases';
import { HeaderService } from '../../services/header.service';
import { PersonalitiesPhraseService } from '../../services/personalities-phrase.service';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-mob',
  standalone: true,
  imports: [AsyncPipe, RouterLink, SocialLinksComponent],
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
  personalitiesPhraseData$!: Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  } | null>;

  ngOnInit(): void {
    this.isMenuOpen$ = this.headerService.isMobMenuOpen$;
  }

  toggleMenu() {
    this.headerService.toggleMenu();
  }
}
