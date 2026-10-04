import { Component, inject } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { openWhatsAppBlank } from '../../core/whatsapp';

@Component({
  selector: 'app-whatsapp-float',
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.scss',
  host: {
    '[class.has-cart-bar]': 'cart.lines().length > 0',
  },
})
export class WhatsappFloatComponent {
  readonly cart = inject(CartService);

  chat(): void {
    openWhatsAppBlank();
  }
}
