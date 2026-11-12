import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../../features/auth/services/user.service';
import { NotificationService } from '../../../services/notification.service';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-topbar',
  imports: [TranslatePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  private translate = inject(TranslateService);
  private userService = inject(UserService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private host: ElementRef<HTMLElement> = inject(ElementRef);

  readonly languages: Language[] = [
    { code: 'en', label: 'English' },
    { code: 'sw', label: 'Kiswahili' },
    { code: 'fr', label: 'Français' },
  ];

  currentLang: Language;
  langOpen = false;
  userOpen = false;

  currentUser = JSON.parse(localStorage.getItem('current_user') || '{}');

  constructor() {
    const saved = localStorage.getItem('lang') || 'en';
    this.currentLang =
      this.languages.find((l) => l.code === saved) ?? this.languages[0];
    this.translate.use(this.currentLang.code);
  }

  get displayName(): string {
    return this.currentUser.fullName || this.currentUser.name || 'User';
  }

  /** "Samuel Ndambuki" -> "SN" */
  get initials(): string {
    return this.displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0].toUpperCase())
      .join('');
  }

  /** "ADMIN" -> "Admin" */
  get roleLabel(): string {
    const role: string = this.currentUser.role || 'Viewer';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  toggleLang(): void {
    this.langOpen = !this.langOpen;
    this.userOpen = false;
  }

  toggleUser(): void {
    this.userOpen = !this.userOpen;
    this.langOpen = false;
  }

  switchLang(lang: Language): void {
    this.currentLang = lang;
    this.langOpen = false;
    this.translate.use(lang.code);
    localStorage.setItem('lang', lang.code);
  }

  logout(): void {
    this.userOpen = false;
    this.userService.logout();
    this.notificationService.showSuccess('You have logged out.');
    this.router.navigate(['/login']);
  }

  /** Close menus when clicking anywhere outside the top bar */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.langOpen = false;
      this.userOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.langOpen = false;
    this.userOpen = false;
  }
}
