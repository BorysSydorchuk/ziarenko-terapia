# Зернятко / Ziarnko

Single-page bilingual (Ukrainian / Polish) website for Liudmyla Sydorchuk,
a psychotherapist practicing in Kraków, Poland. Static HTML/CSS/JS, no
build step, no frameworks — deployable as-is to GitHub Pages.

## File structure

```
/
├── index.html      Ukrainian version (default / primary)
├── pl.html         Polish version (identical structure, translated content)
├── css/
│   └── style.css   Single stylesheet for both pages
├── js/
│   └── main.js     Single script for both pages
└── images/
    └── logo.svg    Sprout-in-oval mark, also used as the SVG favicon
```

## Running locally

No build tools needed — just serve the folder over HTTP (opening the
HTML files directly via `file://` will break the Google Maps iframe and
some relative-path edge cases).

```bash
# from the project root
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Deploying to GitHub Pages

Push this folder to a repository and enable Pages on the `main` branch
(root directory). No build/CI step is required since everything is
already static.

## Before going live — placeholders to replace

- **`images/og-image.png`** — 1200×630 social-share image. Doesn't exist
  yet; until it's added, `og:image` won't render a preview when the site
  is shared on social media. A comment above the tag in both `<head>`s
  notes this.
- **Google Maps embed** — the iframe `src` in both files uses a
  `maps.google.com/maps?q=...` query embed for the office address. It's
  functional, but for a pixel-precise pin, generate a proper embed code
  from Google Maps → Share → Embed a map and swap the `src`.
- **Web3Forms access key** — the contact form's hidden `access_key` field
  is already set; confirm it's tied to the correct Web3Forms account
  before launch.

## Content notes

- The only two pages are `index.html` (`lang="uk"`) and `pl.html`
  (`lang="pl"`). Both share the same section IDs, class names, and
  `js/main.js` — the JS doesn't branch on language, it just reads text
  already baked into each page's HTML (e.g. the FAQ answers, form
  placeholder copy, button loading text via `data-loading-text`).
- The language toggle (`.lang-switch-link`) saves `window.scrollY` to
  `sessionStorage` before navigating, and the destination page restores
  it on load — so switching languages mid-scroll doesn't reset you to
  the top.
- The contact email is intentionally **not** present in the visible
  HTML source (only in the JSON-LD schema and the privacy-policy legal
  text, both of which need it structurally). It's assembled and
  injected into `#email-link` by `main.js` on load as basic scraper
  obfuscation.
- No analytics, cookies, or third-party trackers are included — the
  contact form posts directly to Web3Forms, and the Google Maps iframe
  is the only third-party embed.

## Known limitation

This project doesn't yet have an automated test suite or a headless
browser check baked in — verification so far has been static (HTML
structure, JSON-LD validity, cross-referenced IDs/classes) plus manual
review of `main.js`. Before shipping a change, open both pages in an
actual browser and click through the language toggle, FAQ accordion,
mobile menu, and contact form.
