# ListFast

Snap a photo, get a marketplace-ready listing. ListFast identifies the item from a photo, writes a Facebook Marketplace-ready title and description, optionally generates a product shot, and tracks what sold and what you made. Single-file PWA, no server, no account.

**Live:** https://johnlaz.github.io/listfast/ (landing) · https://johnlaz.github.io/listfast/app/ (app)

## Repo layout

```
/index.html            Landing page
/README.md
/app/index.html        The app (all CSS + JS inline)
/app/manifest.json     PWA manifest (scope = /app/)
/app/sw.js             Service worker
/app/icon-192.png      App icons
/app/icon-512.png
```

## AI and model setup

Add keys once in **Settings (⚙)**. Keys are stored in your browser only.

| Provider | Used for | Key |
|---|---|---|
| Groq | Photo identification (vision) and listing text | Required |
| Gemini | Product-shot image generation (Imagen) | Optional |
| Pollinations | Product-shot image generation | None needed (default) |

Models are selectable under **Settings → AI Models**. Defaults are `meta-llama/llama-4-scout-17b-16e-instruct` (vision), `llama-3.3-70b-versatile` (text) and `imagen-3.0-generate-002` (image). Saving a key, or tapping **Refresh model lists**, fetches each provider's current list into the pickers. Your selected models are never swapped automatically; if one disappears from the provider's list it stays selected and is flagged.

Note: listing copy is currently written for Facebook Marketplace regardless of the platform you tag the item with.

## Data and privacy

- The ledger, photos and API keys live in your browser (`localStorage` and IndexedDB). There is no ListFast server.
- Photos are sent to Groq only when you scan, and generation prompts go to Gemini or Pollinations only when you generate a product shot.
- Export or import your ledger and settings as JSON under Settings. Settings backups contain your API keys, so keep them private.
- Storage keys (`mm_*`) and the `MarketMasterDB` database keep their original names so data from the earlier MarketMaster app carries over on the same browser.

## Deploy and update

1. Create the repo `listfast` and upload the files above, keeping `/app` as a subfolder.
2. **Settings → Pages → Deploy from branch → main → / (root).**
3. To ship an update, change `APP_VERSION` in `app/index.html` and the `CACHE` name in `app/sw.js` together (for example `1.4` and `listfast-v1.4`). Installed copies show an "Update ready" bar and reload on tap.

Install: iPhone/iPad Safari → Share → Add to Home Screen; Android Chrome → ⋮ → Install app; desktop Chrome/Edge → install icon in the address bar.

## Changelog

- **v1.3**: Renamed from MarketMaster AI to ListFast. New icon and light theme. Landing page rewritten to match what the app does. Model pickers with fetch-on-key-save and refresh. Service worker: skips API and cross-origin requests, network timeout, update prompt. Gemini key sent as a header instead of a URL parameter. Accessibility labels and focus rings.
- **v1.2**: MarketMaster AI.

© 2026 LAZLAB Creations. All Rights Reserved. · lazlab.io@gmail.com
