import { Component, inject } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { formatINR } from '../../core/pricing';

@Component({
  selector: 'app-cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrl: './cart-bar.component.scss',
})
export class CartBarComponent {
  readonly cart = inject(CartService);
  readonly formatINR = formatINR;

  review(): void {
    this.cart.openDrawer();
  }
}
