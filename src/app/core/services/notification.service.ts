import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationQueue = new BehaviorSubject<string[]>([]);
  private isDisplaying = false;

  constructor(private snackBar: MatSnackBar) {
    this.notificationQueue.subscribe((notifications) => {
      if (!this.isDisplaying && notifications.length > 0) {
        this.displayNextNotification();
      }
    });
  }

  setNotification(message: string) {
    const currentQueue = this.notificationQueue.value;
    this.notificationQueue.next([...currentQueue, message]);
  }

  private displayNextNotification() {
    const currentQueue = this.notificationQueue.value;

    if (currentQueue.length > 0) {
      this.isDisplaying = true;
      const [nextMessage, ...remainingMessages] = currentQueue;

      this.snackBar
        .open(nextMessage, 'Закрити', {
          duration: 7000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
        .afterDismissed()
        .subscribe(() => {
          this.notificationQueue.next(remainingMessages);
          this.isDisplaying = false;
        });
    }
  }
}
