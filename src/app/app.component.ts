import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer.component';
import { CartBarComponent } from './shared/cart-bar/cart-bar.component';
import { WhatsappFloatComponent } from './shared/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    CartBarComponent,
    WhatsappFloatComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
