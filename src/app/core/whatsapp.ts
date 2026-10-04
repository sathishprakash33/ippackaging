import { SITE } from '../data/site';
import {
  catalogueTitle,
  getCatalogueItem,
  type CatalogueItem,
} from '../data/catalogue';
import { formatINR, lineAmount, piecesForLots } from './pricing';
import type { CartLine } from './cart.service';

let lastOpenAt = 0;

export function whatsappUrl(phoneIntl: string, message: string): string {
  const phone = phoneIntl.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp once per click (guards double tabs from rapid/double events). */
export function openWhatsApp(message: string, phone = SITE.whatsapp): void {
  const now = Date.now();
  if (now - lastOpenAt < 900) {
    return;
  }
  lastOpenAt = now;

  const url = whatsappUrl(phone, message);
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    window.location.assign(url);
  }
}

export function openWhatsAppBlank(phone = SITE.whatsapp): void {
  openWhatsApp('Hi! I would like to know about LP Packaging products.', phone);
}

export function createOrderId(): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LP-${y}${m}${d}-${rand}`;
}

export function buildSellerMessage(item: CatalogueItem): string {
  const title = catalogueTitle(item);
  return [
    `*${SITE.name.toUpperCase()}*`,
    '------------------------------',
    `Hi, I'm interested in:`,
    `*${title}*`,
    `Rate: ${formatINR(item.pricePerLot)} / ${item.lotLabel}`,
    `MOQ: ${item.lotSize === 1 ? '1 ' + item.lotLabel : item.lotLabel}`,
    '',
    'Please confirm stock, delivery time, and final amount.',
    `(${SITE.instagramLabel})`,
  ].join('\n');
}

export function buildCartOrderMessage(lines: CartLine[]): string {
  const orderId = createOrderId();
  const divider = '------------------------------';
  const out: string[] = [
    `*${SITE.name.toUpperCase()}*`,
    `Order ID: *${orderId}*`,
    divider,
    '*ORDER DETAILS*',
    '',
  ];

  let total = 0;
  let index = 1;

  for (const line of lines) {
    const item = getCatalogueItem(line.skuId);
    if (!item || line.lots <= 0) continue;

    const amount = lineAmount(item, line.lots);
    const pcs = piecesForLots(item, line.lots);
    total += amount;

    out.push(`*${index}. ${catalogueTitle(item)}*`);
    if (item.lotSize > 1) {
      out.push(`   Qty: ${pcs} pcs (${line.lots} × ${item.lotLabel})`);
      out.push(`   Rate: ${formatINR(item.pricePerLot)} / ${item.lotLabel}`);
    } else {
      out.push(`   Qty: ${line.lots} ${item.lotLabel}${line.lots > 1 ? 's' : ''}`);
      out.push(`   Rate: ${formatINR(item.pricePerLot)} each`);
    }
    out.push(`   Amount: *${formatINR(amount)}*`);
    out.push(divider);
    index += 1;
  }

  out.push('*SUMMARY*');
  out.push(`   Total: *${formatINR(total)}*`);
  out.push('==============================');
  out.push('Delivery city: ');
  out.push('Please confirm this order. Thank you!');

  return out.join('\n');
}
