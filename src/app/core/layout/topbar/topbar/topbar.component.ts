import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    this.toggleSidebar.emit();
  }
  langOpen = false;

  languages = [
    { code: 'en', locale: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sw', locale: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
    { code: 'fr', locale: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  currentLang = this.languages[0];

  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'en';
    this.currentLang =
      this.languages.find((l) => l.code === saved) || this.languages[0];
    this.translate.use(this.currentLang.code);
  }

  toggleLang() {
    this.langOpen = !this.langOpen;
  }

  switchLang(lang: (typeof this.languages)[0]) {
    this.currentLang = lang;
    this.langOpen = false;
    this.translate.use(lang.code);
    localStorage.setItem('lang', lang.code);
  }
}
