import { Component, input } from '@angular/core';
import { Product } from '../data/products';

@Component({
  selector: 'app-product-icon',
  template: `
    <svg viewBox="0 0 48 48" aria-hidden="true">
      @switch (name()) {
        @case ('cover') {
          <rect x="6" y="12" width="36" height="26" rx="3" />
          <path d="M6 15l18 12 18-12" />
        }
        @case ('pod') {
          <rect x="10" y="6" width="28" height="36" rx="3" />
          <path d="M10 13h28" />
          <rect x="15" y="19" width="18" height="12" rx="1.5" />
          <path d="M18 36h12" />
        }
        @case ('box') {
          <path d="M24 5l17 9v20l-17 9-17-9V14z" />
          <path d="M7 14l17 9 17-9" />
          <path d="M24 23v20" />
          <path d="M15.5 9.5l17 9" />
        }
        @case ('bulk') {
          <rect x="6" y="26" width="16" height="16" rx="1.5" />
          <rect x="26" y="26" width="16" height="16" rx="1.5" />
          <rect x="16" y="8" width="16" height="16" rx="1.5" />
          <path d="M14 26v5M34 26v5M24 8v5" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    svg {
      width: 28px;
      height: 28px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class ProductIconComponent {
  readonly name = input.required<Product['icon']>();
}
