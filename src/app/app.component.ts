import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { LoadingService } from './core/services/loading.service';
import { PersonalitiesPhraseService } from './core/services/personalities-phrase.service';
import { ThemeService } from './core/services/theme.service';
import { LoaderSquareComponent } from './shared/components/loader-square/loader-square.component';
import { MatIconsService } from './core/services/mat-icons.service';
import { MarqueeComponent } from './shared/components/marquee/marquee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressBarModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    LoaderSquareComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FooterComponent,
    MarqueeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly loadingService = inject(LoadingService);
  private readonly themeService = inject(ThemeService);
  private readonly personalitiesPhrasesService = inject(
    PersonalitiesPhraseService
  );
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private iconService = inject(MatIconsService);

  //
  loading$!: Observable<boolean>;
  currentReqMethod$!: Observable<string>;
  ngOnInit(): void {
    //
    this.personalitiesPhrasesService
      .getPersonalitiesPhrases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.loading$ = this.loadingService.isLoading();
    this.themeService.initTheme();
  }
}
