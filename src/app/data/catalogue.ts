export type CatalogueCategory = 'courier-pod' | 'roll';

export interface CatalogueItem {
  id: string;
  name: string;
  sizeLabel: string;
  category: CatalogueCategory;
  /** Price for one lot (see lotSize). */
  pricePerLot: number;
  lotSize: number;
  lotLabel: string;
  pod: boolean;
}

/** Rates from LP Packaging courier bag price list (per 100 pcs unless noted). */
export const CATALOGUE: CatalogueItem[] = [
  {
    id: 'bag-6x8-pod',
    name: 'Courier bag',
    sizeLabel: '6 × 8',
    category: 'courier-pod',
    pricePerLot: 160,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-8x10-pod',
    name: 'Courier bag',
    sizeLabel: '8 × 10',
    category: 'courier-pod',
    pricePerLot: 210,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-10x12-pod',
    name: 'Courier bag',
    sizeLabel: '10 × 12',
    category: 'courier-pod',
    pricePerLot: 280,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-10x14-pod',
    name: 'Courier bag',
    sizeLabel: '10 × 14',
    category: 'courier-pod',
    pricePerLot: 330,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-12x14-pod',
    name: 'Courier bag',
    sizeLabel: '12 × 14',
    category: 'courier-pod',
    pricePerLot: 360,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-12x16-pod',
    name: 'Courier bag',
    sizeLabel: '12 × 16',
    category: 'courier-pod',
    pricePerLot: 380,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-14x16-pod',
    name: 'Courier bag',
    sizeLabel: '14 × 16',
    category: 'courier-pod',
    pricePerLot: 480,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-14x18-pod',
    name: 'Courier bag',
    sizeLabel: '14 × 18',
    category: 'courier-pod',
    pricePerLot: 490,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-15x19-pod',
    name: 'Courier bag',
    sizeLabel: '15 × 19',
    category: 'courier-pod',
    pricePerLot: 560,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'bag-16x20-pod',
    name: 'Courier bag',
    sizeLabel: '16 × 20',
    category: 'courier-pod',
    pricePerLot: 610,
    lotSize: 100,
    lotLabel: '100 pcs',
    pod: true,
  },
  {
    id: 'roll-corrugated-13',
    name: 'Corrugated roll',
    sizeLabel: '13 inch',
    category: 'roll',
    pricePerLot: 13,
    lotSize: 1,
    lotLabel: 'roll',
    pod: false,
  },
];

export function getCatalogueItem(id: string): CatalogueItem | undefined {
  return CATALOGUE.find((item) => item.id === id);
}

export function catalogueTitle(item: CatalogueItem): string {
  const pod = item.pod ? ' (POD)' : '';
  return `${item.name} ${item.sizeLabel}${pod}`;
}
