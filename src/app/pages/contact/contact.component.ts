import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site';
import { RevealDirective } from '../../shared/reveal.directive';
import { openWhatsApp } from '../../core/whatsapp';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly site = SITE;
  readonly waLink = `https://api.whatsapp.com/send?phone=${SITE.whatsapp}`;

  orderOnWhatsApp(): void {
    openWhatsApp(
      `*${SITE.name.toUpperCase()}*\nHi! I want to place a bulk packaging order. Please help with sizes and delivery.`
    );
  }
}
