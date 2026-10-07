import { useEffect, useState } from 'react';
import { parseQuote, quoteFeeds, quoteIsStale, type Quote, type QuoteId } from '@/lib/live-quotes';

type QuoteState = { quote: Quote | null; failed: boolean };
const initial: Record<QuoteId, QuoteState> = {
  gold: { quote: null, failed: false }, btc: { quote: null, failed: false }, eth: { quote: null, failed: false },
};
const format = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function LiveTicker() {
  const [rates, setRates] = useState(initial);
  const [now, setNow] = useState(0);

  useEffect(() => {
    let active = true;
    const controllers = new Set<AbortController>();
    const pending = new Set<QuoteId>();
    const refresh = () => {
      setNow(Date.now());
      for (const feed of quoteFeeds) {
        if (pending.has(feed.id)) continue;
        pending.add(feed.id);
        const controller = new AbortController();
        controllers.add(controller);
        const timeout = setTimeout(() => controller.abort(), 8000);
        void (async () => {
          try {
            const response = await fetch(feed.url, { signal: controller.signal, cache: 'no-store' });
            if (!response.ok) throw new Error('Feed unavailable');
            const quote = parseQuote(feed.id, await response.json());
            if (active) setRates(previous => ({ ...previous, [feed.id]: { quote, failed: false } }));
          } catch {
            if (active) setRates(previous => ({ ...previous, [feed.id]: { ...previous[feed.id], failed: true } }));
          } finally {
            clearTimeout(timeout);
            controllers.delete(controller);
            pending.delete(feed.id);
          }
        })();
      }
    };
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => {
      active = false;
      clearInterval(interval);
      controllers.forEach(controller => controller.abort());
    };
  }, []);

  return <div className="ticker live-ticker" role="region" aria-label="Live market prices">
    <div className="ticker-inner">
      <span className="ticker-label">MARKET PRICES</span>
      {quoteFeeds.map(feed => {
        const { quote, failed } = rates[feed.id];
        const stale = quote !== null && (failed || quoteIsStale(quote, now));
        const status = quote ? stale ? 'STALE' : 'LIVE' : failed ? 'UNAVAILABLE' : 'LOADING';
        const title = `${feed.source}${quote ? ` · Updated ${new Date(quote.timestamp).toISOString()}` : ''}`;
        return <span key={feed.id} className={`ticker-quote ticker-${feed.id}`} title={title}>
          <b>{feed.label}</b>
          <span className="ticker-price">{quote ? `${feed.id === 'gold' ? '$' : ''}${format.format(quote.price)}` : '—'}</span>
          {quote?.change !== null && quote?.change !== undefined && <em className={quote.change < 0 ? 'loss' : 'profit'}>{quote.change < 0 ? '▼' : '▲'} {Math.abs(quote.change).toFixed(2)}%</em>}
          <small className={`quote-status ${status === 'LIVE' ? 'profit' : ''}`}>{status === 'LIVE' && <span className="live-dot" />}{status}</small>
        </span>;
      })}
      <span className="ticker-source">Gold API · Binance</span>
    </div>
  </div>;
}