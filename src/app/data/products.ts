export interface Product {
  slug: string;
  name: string;
  blurb: string;
  points: string[];
  icon: 'cover' | 'pod' | 'box' | 'bulk';
}

export const PRODUCTS: Product[] = [
  {
    slug: 'courier-covers',
    name: 'Courier Covers',
    blurb: 'Durable mailer covers for e-commerce and courier dispatch.',
    points: ['Tear-resistant film', 'Multiple sizes', 'Ready for bulk packs'],
    icon: 'cover',
  },
  {
    slug: 'pod-bags',
    name: 'POD Bags & Jackets',
    blurb: 'Proof-of-delivery bags and jackets used on high-volume routes.',
    points: ['POD jacket formats', 'Clear size options', 'Ideal for 100-pc lots'],
    icon: 'pod',
  },
  {
    slug: 'cardboard-boxes',
    name: 'Cardboard Boxes',
    blurb: 'Corrugated boxes in all common shipping sizes.',
    points: ['All sizes available', 'Carton strength options', 'Brand-ready packing'],
    icon: 'box',
  },
  {
    slug: 'bulk-orders',
    name: 'Bulk & Custom Orders',
    blurb: 'Volume pricing and repeat supply for shops and logistics teams.',
    points: ['Wholesale lots', 'Repeat supply', 'Custom size enquiries'],
    icon: 'bulk',
  },
];

export const BAG_SIZES = [
  '12 × 16',
  '14 × 16',
  '14 × 18',
  '16 × 19',
  '18 × 20',
  '20 × 24',
];

export const STATS = [
  { value: 479, suffix: '+', label: 'Instagram followers' },
  { value: 4, suffix: '', label: 'Product lines' },
  { value: 6, suffix: '+', label: 'Standard bag sizes' },
  { value: 100, suffix: ' pcs', label: 'Bulk lot size' },
];

export const MARQUEE = [
  'Courier Covers',
  'POD Bags',
  'POD Jackets',
  'Cardboard Boxes',
  'All Sizes',
  'Bulk Orders',
  'Wholesale Supply',
  'Custom Sizes',
];

export const STEPS = [
  {
    title: 'Pick sizes',
    text: 'Add courier bag sizes to your cart on the website.',
  },
  {
    title: 'Order on WhatsApp',
    text: 'Place order with one tap — we confirm stock and delivery.',
  },
  {
    title: 'Packed & dispatched',
    text: 'Your order is packed and sent to your city.',
  },
];

export const HIGHLIGHTS = [
  {
    title: 'Complete range',
    text: 'Covers, POD bags, and boxes from one packaging partner.',
  },
  {
    title: 'Bulk ready',
    text: 'Sized for 100-piece lots and ongoing courier demand.',
  },
  {
    title: 'All sizes',
    text: 'Standard dispatch sizes plus custom requests on enquiry.',
  },
];
