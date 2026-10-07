export type Market = 'all' | 'gold' | 'crypto';
export const signals = [
  { id: 'gnc-01', market: 'gold' as const, pair: 'XAUUSD', side: 'BUY', entry: '4,170 – 4,172', stop: '4,160', targets: ['4,185', '4,200', '4,230'], confidence: 94, status: 'RUNNING', result: '+32 pips', time: '2 min ago', reasoning: 'Price swept the previous session low and reclaimed the bullish order block. The sample entry follows a break of structure, with a stop below the liquidity sweep and targets at prior session highs.' },
  { id: 'gnc-02', market: 'crypto' as const, pair: 'BTCUSD', side: 'LONG', entry: '68,200 – 68,450', stop: '67,800', targets: ['69,000', '69,800', '70,500'], confidence: 89, status: 'TARGET HIT', result: '+2.34%', time: '18 min ago', reasoning: 'The sample setup uses a retest of the four-hour demand zone following a bullish structure shift. First target aligns with nearby supply. This is an illustrative strategy explanation, not live AI analysis.' },
  { id: 'gnc-03', market: 'crypto' as const, pair: 'ETHUSD', side: 'LONG', entry: '3,390 – 3,410', stop: '3,350', targets: ['3,450', '3,500', '3,580'], confidence: 91, status: 'RUNNING', result: '+1.18%', time: '34 min ago', reasoning: 'The example illustrates an accumulation-range breakout and demand-zone retest. A stop below range support defines the risk before entry. All prices and results are sample data.' },
];
export const courses = [
  { category: 'GOLD MASTERY', title: 'The Gold Standard', subtitle: 'Smart money concepts for XAUUSD', modules: 8, duration: '4h 20m', market: 'gold' },
  { category: 'CRYPTO MASTERY', title: 'Beyond the Breakout', subtitle: 'Market structure, liquidity & conviction', modules: 10, duration: '5h 10m', market: 'crypto' },
  { category: 'TRADING FOUNDATIONS', title: 'Protect Your Edge', subtitle: 'Risk management & trading psychology', modules: 6, duration: '2h 45m', market: 'gold' },
];