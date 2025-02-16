import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressBarModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    LoaderSquareComponent,
    AsyncPipe,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private loadingService = inject(LoadingService);

  loading$!: Observable<boolean>;
  currentReqMethod$!: Observable<string>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
  }
}
