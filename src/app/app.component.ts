import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { LoadingService } from './shared/services/loading.service';
import { LoaderSquareComponent } from './components/loader-square/loader-square.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from './shared/services/theme.service';
import { PersonalitiesPhraseService } from './shared/services/personalities-phrase.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleSheetsService } from './shared/services/google-sheets.service';

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
  // private readonly googleSheetService = inject(GoogleSheetsService);
  //  this.googleSheetService.getSheetsTestsData().subscribe((r) => {
  //     console.log(r);
  //   });
  private destroyRef = inject(DestroyRef);

  loading$!: Observable<boolean>;
  currentReqMethod$!: Observable<string>;
  ngOnInit(): void {
    this.personalitiesPhrasesService
      .getPersonalitiesPhrases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.loading$ = this.loadingService.isLoading();
    this.themeService.initTheme();
  }
}
