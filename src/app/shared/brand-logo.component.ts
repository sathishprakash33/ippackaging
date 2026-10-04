import { Component, input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 48 48" aria-hidden="true" class="brand-logo">
      <defs>
        <linearGradient id="lpGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e8d4a8" />
          <stop offset="100%" stop-color="#b8945f" />
        </linearGradient>
      </defs>
      <path
        d="M24 4 L42 14 V34 L24 44 L6 34 V14 Z"
        fill="none"
        stroke="url(#lpGold)"
        stroke-width="2.2"
      />
      <path d="M24 4 L24 44 M6 14 L42 34 M42 14 L6 34" stroke="url(#lpGold)" stroke-width="1" opacity="0.45" />
      <text
        x="24"
        y="27"
        text-anchor="middle"
        font-family="Outfit, sans-serif"
        font-size="13"
        font-weight="800"
        fill="url(#lpGold)"
      >
        LP
      </text>
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
    }

    .brand-logo {
      filter: drop-shadow(0 2px 6px rgba(201, 176, 138, 0.35));
    }
  `,
})
export class BrandLogoComponent {
  readonly size = input(44);
}
