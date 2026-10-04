# LP Packaging

Angular site for **LP Packaging** (`@lppackaging0203`) — catalogue, cart, and WhatsApp ordering.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4200

## Features

- Product catalogue with size-wise rates (100 pc lots)
- Add to cart (saved in browser)
- **Place order on WhatsApp** with prefilled line items
- **Message seller** per product

## Config

Phone / WhatsApp: `src/app/data/site.ts`  
Catalogue rates: `src/app/data/catalogue.ts`

## Pages

- `/` Home
- `/products` Shop catalogue
- `/about` About
- `/contact` WhatsApp & Instagram
