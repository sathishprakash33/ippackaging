import { computed, Injectable, signal } from '@angular/core';
import { CATALOGUE, getCatalogueItem } from '../data/catalogue';
import { lineAmount } from './pricing';

export interface CartLine {
  skuId: string;
  lots: number;
}

const STORAGE_KEY = 'lp-packaging-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly lines = signal<CartLine[]>(this.readStorage());
  readonly drawerOpen = signal(false);

  readonly lineCount = computed(() =>
    this.lines().reduce((sum, line) => sum + line.lots, 0)
  );

  readonly total = computed(() =>
    this.lines().reduce((sum, line) => {
      const item = getCatalogueItem(line.skuId);
      if (!item) return sum;
      return sum + lineAmount(item, line.lots);
    }, 0)
  );

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  add(skuId: string, lots = 1): void {
    this.lines.update((prev) => {
      const existing = prev.find((l) => l.skuId === skuId);
      let next: CartLine[];
      if (existing) {
        next = prev.map((l) =>
          l.skuId === skuId ? { ...l, lots: l.lots + lots } : l
        );
      } else {
        next = [...prev, { skuId, lots }];
      }
      this.persist(next);
      return next;
    });
  }

  setLots(skuId: string, lots: number): void {
    this.lines.update((prev) => {
      let next: CartLine[];
      if (lots <= 0) {
        next = prev.filter((l) => l.skuId !== skuId);
      } else {
        const exists = prev.some((l) => l.skuId === skuId);
        next = exists
          ? prev.map((l) => (l.skuId === skuId ? { ...l, lots } : l))
          : [...prev, { skuId, lots }];
      }
      this.persist(next);
      return next;
    });
  }

  remove(skuId: string): void {
    this.setLots(skuId, 0);
  }

  clear(): void {
    this.lines.set([]);
    this.persist([]);
  }

  lotsFor(skuId: string): number {
    return this.lines().find((l) => l.skuId === skuId)?.lots ?? 0;
  }

  private readStorage(): CartLine[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartLine[];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (l) =>
          l &&
          typeof l.skuId === 'string' &&
          typeof l.lots === 'number' &&
          l.lots > 0 &&
          CATALOGUE.some((c) => c.id === l.skuId)
      );
    } catch {
      return [];
    }
  }

  private persist(lines: CartLine[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore quota / private mode
    }
  }
}
