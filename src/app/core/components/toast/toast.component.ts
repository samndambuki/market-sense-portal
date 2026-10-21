import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { EMPTY, Observable, Subscription, switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  notification$ = this.notificationService.notification$;
  private notificationSubscription?: Subscription;
  close() {
    this.notificationService.clear();
  }
  ngOnInit(): void {
    this.notificationSubscription = this.notification$
      .pipe(switchMap((notification) => (notification ? timer(3000) : EMPTY)))
      .subscribe(() => {
        this.notificationService.clear();
      });
  }
  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }
}
