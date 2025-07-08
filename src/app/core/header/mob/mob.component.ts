import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

//
import {
  PersonalityDayPhrases,
  UsersPhraseSubject,
} from '../../../shared/models/personalities-phrases';
import { SocialLinksComponent } from '../../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-mob',
  standalone: true,
  imports: [RouterLink, SocialLinksComponent],
  templateUrl: './mob.component.html',
  styleUrl: './mob.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobComponent {
  hiddenRoutes: boolean = true;

  personalitiesPhraseData$!: Observable<{
    allPhrases: PersonalityDayPhrases[];
    usersPhrase: UsersPhraseSubject;
  } | null>;
  isOpenMenu = signal<boolean>(false);

  toggleMenu() {
    this.isOpenMenu.update((prev) => !prev);
  }
}
