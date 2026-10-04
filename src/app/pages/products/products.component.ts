import { Component, inject } from '@angular/core';
import { SITE } from '../../data/site';
import { CATALOGUE, type CatalogueItem } from '../../data/catalogue';
import { PRODUCTS } from '../../data/products';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProductIconComponent } from '../../shared/product-icon.component';
import { CartService } from '../../core/cart.service';
import { formatINR } from '../../core/pricing';

@Component({
  selector: 'app-products',
  imports: [RevealDirective, ProductIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly site = SITE;
  readonly products = PRODUCTS;
  readonly catalogue = CATALOGUE;
  readonly formatINR = formatINR;
  readonly cart = inject(CartService);

  lotsFor(item: CatalogueItem): number {
    return this.cart.lotsFor(item.id);
  }

  addLot(item: CatalogueItem): void {
    this.cart.add(item.id, 1);
  }

  removeLot(item: CatalogueItem): void {
    const current = this.cart.lotsFor(item.id);
    this.cart.setLots(item.id, current - 1);
  }

  setLotsFromInput(item: CatalogueItem, event: Event): void {
    const el = event.target as HTMLInputElement;
    const parsed = parseInt(el.value, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      const fallback = this.cart.lotsFor(item.id) || 1;
      el.value = String(fallback);
      this.cart.setLots(item.id, fallback);
      return;
    }
    const lots = Math.min(999, parsed);
    el.value = String(lots);
    this.cart.setLots(item.id, lots);
  }

  blurInput(event: Event): void {
    (event.target as HTMLInputElement).blur();
  }
}
