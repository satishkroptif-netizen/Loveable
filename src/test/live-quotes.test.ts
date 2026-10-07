import { describe, expect, it } from 'vitest';
import { parseQuote, quoteIsStale } from '@/lib/live-quotes';

const now = Date.parse('2026-10-07T10:07:47Z');
describe('Live market quote validation', () => {
  it('never invents a gold percentage when the feed omits previous close', () => {
    expect(parseQuote('gold', { price: 4118.2, updatedAt: new Date(now).toISOString() }, now).change).toBeNull();
  });
  it('calculates a gold change only with a valid previous close', () => {
    expect(parseQuote('gold', { price: 110, prev_close_price: 100, updatedAt: new Date(now).toISOString() }, now).change).toBe(10);
  });
  it('parses negative Binance changes without relabeling the quote currency', () => {
    expect(parseQuote('btc', { lastPrice: '83664.00', priceChangePercent: '-2.736', closeTime: now }, now)).toEqual({ price: 83664, change: -2.736, timestamp: now });
  });
  it.each([{}, { lastPrice: 'NaN', closeTime: now }, { lastPrice: '-1', closeTime: now }, { lastPrice: '2' }])('rejects invalid or undated data %j', data => {
    expect(() => parseQuote('eth', data, now)).toThrow();
  });
  it('flags old quotes as stale', () => {
    expect(quoteIsStale({ price: 100, change: null, timestamp: now - 61_000 }, now)).toBe(true);
  });
});