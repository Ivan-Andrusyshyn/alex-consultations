import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HeaderService } from '../../../shared/services/header.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ToggleBtnComponent } from '../../toggle-btn/toggle-btn.component';

@Component({
  selector: 'app-mob',
  standalone: true,
  imports: [NgIf, ToggleBtnComponent, AsyncPipe, RouterLink],
  templateUrl: './mob.component.html',
  styleUrl: './mob.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobComponent implements OnInit {
  private headerService = inject(HeaderService);
  isMenuOpen$!: Observable<boolean>;
  hiddenRoutes: boolean = true;

  ngOnInit(): void {
    this.isMenuOpen$ = this.headerService.isMobMenuOpen$;
  }
  toggleMenu() {
    this.headerService.toggleMenu();
  }
}
