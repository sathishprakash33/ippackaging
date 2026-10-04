import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../data/site';
import { openWhatsAppBlank } from '../core/whatsapp';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly site = SITE;
  readonly year = new Date().getFullYear();

  chatWhatsApp(): void {
    openWhatsAppBlank();
  }
}
