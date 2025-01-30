import { Component, DestroyRef, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ModalComponent } from '../../components/modal/modal.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ConsultationComponent } from '../../components/consultation/consultation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,ConsultationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        contentType: 'form-consultation',
        title: '🔥 Готові до прориву?',
        btn: {
          cancel: 'Ні, дякую',
          confirm: '🚀 Отримати консультацію',
        },
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          console.log(result);
        }
      });
  }
}
