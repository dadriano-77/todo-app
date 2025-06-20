import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification = {
    show: false,
    message: '',
    type: 'success',
  };

  getNotification() {
    return this.notification;
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  private show(message: string, type: 'success' | 'error' = 'success') {
    this.notification.message = message;
    this.notification.type = type;
    this.notification.show = true;

    setTimeout(() => {
      this.notification.show = false;
    }, 3000);
  }
}
