import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationMessage | null>(
    null,
  );
  notification$ = this.notificationSubject.asObservable();
  constructor() {}
  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
  }
  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
  }
  showInfo(message: string): void {
    this.notificationSubject.next({ message, type: 'info' });
  }
  clear(): void {
    this.notificationSubject.next(null);
  }
}
