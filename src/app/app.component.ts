import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressBarModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    NgIf,
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
  isReqMethodGet$!: Observable<boolean>;
  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
    this.isReqMethodGet$ = this.loadingService.getReqMethIsGet();
  }
}
