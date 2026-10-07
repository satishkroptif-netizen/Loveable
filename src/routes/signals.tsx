import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, SignalsFeed } from '@/components/gnc';
export const Route = createFileRoute('/signals')({
 head: () => ({ meta: [{ title: 'Trading Signals — GNC SIGNAL' }, { name: 'description', content: 'Explore illustrative XAUUSD, Bitcoin and Ethereum setups with entries, stops and targets.' }, { property: 'og:title', content: 'Trading Signals — GNC SIGNAL' }, { property: 'og:description', content: 'A precision-first view of Gold and Crypto trading setups. Demonstration data only.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: SignalsPage,
});
function SignalsPage() { return <><PageIntro eyebrow="THE GNC SIGNAL DESK" title="Structure. Conviction. Precision." text="Every setup starts with a plan. Explore sample Gold and Crypto signals with defined entry zones, risk levels and profit targets." /><SignalsFeed /></>; }