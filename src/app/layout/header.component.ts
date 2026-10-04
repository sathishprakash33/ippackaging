import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SITE } from '../data/site';
import { CartService } from '../core/cart.service';
import { openWhatsAppBlank } from '../core/whatsapp';
import { BrandLogoComponent } from '../shared/brand-logo.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class HeaderComponent {
  readonly site = SITE;
  readonly cart = inject(CartService);
  menuOpen = false;
  scrolled = false;

  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  openCart(): void {
    this.cart.openDrawer();
    this.closeMenu();
  }

  chatWhatsApp(): void {
    openWhatsAppBlank();
    this.closeMenu();
  }
}
