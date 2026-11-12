import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface NavItem {
  route: string;
  icon: string;
  /** Text shown in the menu. If `translate` is true it's an ngx-translate key. */
  label: string;
  translate: boolean;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;

  readonly navItems: NavItem[] = [
    {
      route: '/dashboard',
      icon: 'space_dashboard',
      label: 'Dashboard',
      translate: false,
      exact: true,
    },
    {
      route: '/markets',
      icon: 'travel_explore',
      label: 'MARKET_EXPLORER',
      translate: true,
    },
    {
      route: '/competitor-analysis',
      icon: 'query_stats',
      label: 'COMPETITOR_ANALYSIS',
      translate: true,
    },
  ];
}
