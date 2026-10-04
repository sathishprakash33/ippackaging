import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bag-visual',
  template: `
    <div class="bag-visual" [class.bag-visual--roll]="variant() === 'roll'">
      <div class="bag-visual__bg" aria-hidden="true">
        <span class="bag-visual__box bag-visual__box--a"></span>
        <span class="bag-visual__box bag-visual__box--b"></span>
      </div>
      @if (variant() === 'roll') {
        <svg class="bag-visual__roll" viewBox="0 0 80 48" aria-hidden="true">
          <ellipse cx="40" cy="24" rx="32" ry="18" fill="#f8f8f8" stroke="#d0d0d0" stroke-width="1.5" />
          <path d="M12 24 Q40 8 68 24" fill="none" stroke="#e0e0e0" stroke-width="2" />
        </svg>
      } @else {
        <svg class="bag-visual__bag" viewBox="0 0 64 80" aria-hidden="true">
          <rect x="8" y="4" width="48" height="72" rx="4" fill="#fafafa" stroke="#ccc" stroke-width="1.5" />
          <rect x="8" y="4" width="48" height="14" rx="4" fill="#2a2a2a" />
          <rect x="14" y="22" width="22" height="16" rx="2" fill="#e8f4f8" stroke="#9ec5d4" stroke-width="1" />
          <text x="32" y="58" text-anchor="middle" font-size="8" font-weight="700" fill="#333">{{ sizeLabel() }}</text>
        </svg>
      }
      <span class="bag-visual__lp">LP</span>
    </div>
  `,
  styles: `
    .bag-visual {
      position: relative;
      height: 112px;
      margin: -16px -16px 12px;
      padding: 12px;
      overflow: hidden;
      border-radius: 14px 14px 0 0;
      background: linear-gradient(155deg, #1a9fb8 0%, #0b1f3a 55%, #071224 100%);
    }

    .bag-visual--roll {
      background: linear-gradient(155deg, #2d6a5a 0%, #0b1f3a 100%);
    }

    .bag-visual__bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .bag-visual__box {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background: linear-gradient(135deg, #d4b87a, #9a7b4f);
      opacity: 0.55;
      transform: rotate(12deg);
    }

    .bag-visual__box--a {
      top: 8px;
      left: 6px;
    }

    .bag-visual__box--b {
      bottom: 10px;
      right: 8px;
      transform: rotate(-18deg);
    }

    .bag-visual__bag,
    .bag-visual__roll {
      position: relative;
      z-index: 1;
      display: block;
      height: 88px;
      margin: 0 auto;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
    }

    .bag-visual__lp {
      position: absolute;
      right: 10px;
      bottom: 8px;
      z-index: 2;
      width: 26px;
      height: 26px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: rgba(201, 176, 138, 0.95);
      color: #071224;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.06em;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
  `,
})
export class BagVisualComponent {
  readonly sizeLabel = input('');
  readonly variant = input<'bag' | 'roll'>('bag');
}
