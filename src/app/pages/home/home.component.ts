import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site';
import { openWhatsAppBlank } from '../../core/whatsapp';
import { BAG_SIZES, HIGHLIGHTS, MARQUEE, PRODUCTS, STATS, STEPS } from '../../data/products';
import { RevealDirective } from '../../shared/reveal.directive';
import { CountUpDirective } from '../../shared/count-up.directive';
import { ProductIconComponent } from '../../shared/product-icon.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective, CountUpDirective, ProductIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly site = SITE;
  readonly products = PRODUCTS;
  readonly highlights = HIGHLIGHTS;
  readonly sizes = BAG_SIZES;
  readonly stats = STATS;
  readonly steps = STEPS;
  readonly marqueeItems = [...MARQUEE, ...MARQUEE];

  readonly words = ['Courier Covers', 'POD Bags', 'Cardboard Boxes', 'Bulk Orders'];
  readonly wordIndex = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.wordIndex.update((index) => (index + 1) % this.words.length);
    }, 2200);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  chatWhatsApp(): void {
    openWhatsAppBlank();
  }
}
