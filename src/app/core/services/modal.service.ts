import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from '../../shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}
  private dialog = inject(MatDialog);

  openModal({
    width = '90vw',
    height,
    isForm = true,
    isConfirm = false,
  }: {
    width: string;
    height?: string;
    isForm: boolean;
    isConfirm: boolean;
  }) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width,
      height,
      maxWidth: '1320px',
      data: {
        isForm,
        isConfirm,
        title: 'Ви впевнені що хочете почати з початку ?',
        btn: {
          cancel: 'Ні',
          confirm: 'Так',
        },
      },
    });

    return dialogRef.afterClosed();
  }
}
