import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  catalogueTitle,
  getCatalogueItem,
} from '../../data/catalogue';
import { CartService } from '../../core/cart.service';
import { formatINR, lineAmount, piecesForLots } from '../../core/pricing';
import { buildCartOrderMessage, openWhatsApp } from '../../core/whatsapp';

@Component({
  selector: 'app-cart-drawer',
  imports: [RouterLink],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  readonly formatINR = formatINR;
  readonly getItem = getCatalogueItem;
  readonly title = catalogueTitle;
  readonly lineAmount = lineAmount;
  readonly piecesForLots = piecesForLots;

  onBackdropClick(): void {
    this.cart.closeDrawer();
  }

  changeLots(skuId: string, delta: number): void {
    const current = this.cart.lotsFor(skuId);
    this.cart.setLots(skuId, current + delta);
  }

  setLotsFromInput(skuId: string, event: Event): void {
    const el = event.target as HTMLInputElement;
    const parsed = parseInt(el.value, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      const fallback = this.cart.lotsFor(skuId) || 1;
      el.value = String(fallback);
      this.cart.setLots(skuId, fallback);
      return;
    }
    const lots = Math.min(999, parsed);
    el.value = String(lots);
    this.cart.setLots(skuId, lots);
  }

  blurInput(event: Event): void {
    (event.target as HTMLInputElement).blur();
  }

  placeOrder(): void {
    const lines = this.cart.lines();
    if (!lines.length) return;
    openWhatsApp(buildCartOrderMessage(lines));
  }
}
