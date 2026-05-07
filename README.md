# Elliot J. Fishman P.C. — Static Site

A modern, static, mobile-optimized website for **Elliot J. Fishman P.C.**, ready to host on GitHub Pages or any static host.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, about, practice, team, testimonials, Google reviews, contact |
| `about.html` | Firm story, approach, who we serve |
| `practice.html` | Five practice areas in an interactive accordion |
| `team.html` | Team grid + per-attorney bios (anchored: `team.html#elliot-j-fishman` etc.) |
| `testimonials.html` | Carousel + grid of client testimonials and reviews |
| `contact.html` | Lead-capture form + both office locations |

All pages share `assets/css/site.css` and `assets/js/site.js`.

## Local preview

Just open `index.html` in a browser, or run:

```bash
cd site
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push the contents of `site/` to a repo (e.g. as the repo root, or under `/docs`).
2. In the repo settings → **Pages**, choose the branch and folder.
3. Done — GitHub Pages serves the static files as-is. No build step required.

If you put the site under `/docs`:

```bash
git mv site/* docs/
```

## What to replace before going live

- **Photography**: every striped block marked `IMG · ...` is a placeholder. Drop in real images of Mr. Fishman, the offices, and editorial shots — keep the same `aspect-ratio` for clean layouts.
- **Reviews**: realistic placeholder reviews live in `index.html` and `testimonials.html`. Swap with real Google review excerpts (or wire up the Google Places API).
- **Form submission**: the contact form is currently client-side only — it validates and shows a thank-you state. Wire the `<form>` `action` to Formspree, Netlify Forms, Basin, or a serverless endpoint:
  ```html
  <form class="contact-form form" action="https://formspree.io/f/YOUR_ID" method="POST">
  ```
- **Phone / fax / email / addresses**: search-and-replace if anything changes.
- **Bar admission details and bios** in `team.html` are reasonable placeholders — confirm against the firm's real records.

## Tech notes

- No frameworks. No build step. Vanilla HTML + CSS + ~5 KB of JS.
- Mobile-first responsive — tested 375px → 1440px.
- Smooth scrolling, sticky nav with scrolled state, hamburger menu w/ backdrop, scroll-reveal, accordion practice areas, auto-rotating testimonials, validated contact form.
- Accessibility: skip link, semantic landmarks, focus styles, `prefers-reduced-motion` honored.
- Web fonts: Source Serif 4 (display) + Inter (body), loaded from Google Fonts.
