# Sandhill Investment Management — Investor Profile Questionnaire

An interactive web-based tool that walks clients and prospects through a risk tolerance assessment, generating a personalized asset allocation recommendation.

Based on the Schwab.com Investor Profile Questionnaire methodology.

## Features

- **Sandhill-branded** — uses official brand colors (#004465 teal, #d0ac2b gold), typography, and logo
- **Step-by-step questionnaire** — 7 questions covering Time Horizon and Risk Tolerance
- **Animated results** — donut chart visualization of recommended equity/fixed income split
- **Five allocation profiles** — Conservative, Moderately Conservative, Moderate, Moderately Aggressive, Aggressive
- **Mobile responsive** — works on desktop, tablet, and phone
- **Print-friendly** — results page can be printed for client records
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript

## Files

```
index.html          — Main page
style.css           — Sandhill-branded styles
app.js              — Questionnaire logic and rendering
Sandhill_logo.png   — Company logo
README.md           — This file
```

## Quick Start

Open `index.html` in a web browser. No server or build tools required.

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Deploy from branch → main**
4. Your site will be live at `https://yourusername.github.io/repo-name/`

## Customization

### Colors
Edit the CSS variables at the top of `style.css`:
- `--sandhill-primary` — main teal (#004465)
- `--sandhill-gold` — accent gold (#d0ac2b)

### Logo
Replace `Sandhill_logo.png` with your own logo file. The filename is referenced in `app.js` as `LOGO_PATH`.

### Scoring
The scoring matrix in `getProfileIndex()` in `app.js` maps time horizon and risk tolerance scores to the five profiles.

## Disclaimer

This tool is for educational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making investment decisions.
