export type Quote = { price: number; change: number | null; timestamp: number };
export type QuoteId = 'gold' | 'btc' | 'eth';
export const quoteFeeds: { id: QuoteId; label: string; source: string; url: string }[] = [
  { id: 'gold', label: 'XAU / USD', source: 'Gold API · USD per troy ounce', url: 'https://api.gold-api.com/price/XAU' },
  { id: 'btc', label: 'BTC / USDT', source: 'Binance · 24h change · USDT', url: 'https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT' },
  { id: 'eth', label: 'ETH / USDT', source: 'Binance · 24h change · USDT', url: 'https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT' },
];

function number(value: unknown): number | null {
  if (typeof value !== 'number' && typeof value !== 'string') return null;
  if (value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseQuote(id: QuoteId, data: unknown, now = Date.now()): Quote {
  if (!data || typeof data !== 'object') throw new Error('Invalid quote');
  const record = data as Record<string, unknown>;
  const price = number(id === 'gold' ? record['price'] : record['lastPrice']);
  if (price === null || price <= 0) throw new Error('Invalid price');
  const previous = number(record['prev_close_price']);
  const change = id === 'gold'
    ? previous !== null && previous > 0 ? (price - previous) / previous * 100 : null
    : number(record['priceChangePercent']);
  const timestamp = id === 'gold'
    ? typeof record['updatedAt'] === 'string' ? Date.parse(record['updatedAt']) : NaN
    : number(record['closeTime']) ?? NaN;
  if (!Number.isFinite(timestamp) || timestamp <= 0 || timestamp > now + 60_000) throw new Error('Invalid quote timestamp');
  return { price, change, timestamp };
}

export function quoteIsStale(quote: Quote, now: number) {
  return now - quote.timestamp > 60_000;
}