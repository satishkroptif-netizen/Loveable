<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared GNC navigation and footer in the root layout, with separate home, signals, performance and academy leaves, so each destination is shareable.
- Keep illustrative market data in a shared browser-safe module and label it as demo data; external market feeds and verified performance must not be implied.
- Use global semantic tokens and reusable Gold/Crypto button variants for the brand styling.
- Keep public price polling browser-side in the shared ticker, validate each provider independently, and preserve provider quote currencies and timestamps; failures must never display fabricated or stale values as live.
