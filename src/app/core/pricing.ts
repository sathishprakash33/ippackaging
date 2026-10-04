import type { CatalogueItem } from '../data/catalogue';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function lineAmount(item: CatalogueItem, lots: number): number {
  return item.pricePerLot * lots;
}

export function piecesForLots(item: CatalogueItem, lots: number): number {
  return item.lotSize * lots;
}
