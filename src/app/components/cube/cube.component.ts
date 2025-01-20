import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss',
})
export class CubeComponent {
  readonly dialog = inject(MatDialog);
  cancelAnimation = signal(false);

  openDialog(): void {
    this.cancelAnimation.set(true);
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: '' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.cancelAnimation.set(false);

      if (result !== undefined) {
        console.log(result);
      }
    });
  }
}
