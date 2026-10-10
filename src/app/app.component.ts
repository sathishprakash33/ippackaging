import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
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
export class AppComponent {
  private readonly router = inject(Router);
  readonly showStorefront = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => !event.urlAfterRedirects.startsWith('/admin')),
      startWith(!this.router.url.startsWith('/admin')),
    ),
    { initialValue: !this.router.url.startsWith('/admin') },
  );
}
