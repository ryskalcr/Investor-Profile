# Investor Profile Questionnaire

An interactive web-based tool that walks clients and prospects through a risk tolerance assessment, generating a personalized asset allocation recommendation.

Based on the Schwab.com Investor Profile Questionnaire methodology.

## Features

- **Step-by-step questionnaire** — 7 questions covering Time Horizon and Risk Tolerance
- **Animated results** — donut chart visualization of recommended equity/fixed income split
- **Five allocation profiles** — Conservative, Moderately Conservative, Moderate, Moderately Aggressive, Aggressive
- **Mobile responsive** — works on desktop, tablet, and phone
- **Print-friendly** — results page can be printed for client records
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript (no frameworks or build tools required)

## Allocation Profiles

| Profile | Equity | Fixed Income |
|---------|--------|-------------|
| Conservative | 20% | 80% |
| Moderately Conservative | 40% | 60% |
| Moderate | 60% | 40% |
| Moderately Aggressive | 80% | 20% |
| Aggressive | 100% | 0% |

## Quick Start

### Option A: Open directly
Simply open `index.html` in a web browser. No server required.

### Option B: Local server
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve .
```
Then visit `http://localhost:8000`

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push these files to the `main` branch:
   ```
   index.html
   style.css
   app.js
   README.md
   ```
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch**
5. Choose `main` branch and `/ (root)` folder
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/repo-name/`

## Customization

### Branding
- Edit colors in the CSS `:root` variables (top of `style.css`)
- Replace the logo initials "IP" in the header with your company branding
- Update fonts via the Google Fonts link in `index.html`

### Scoring
- The scoring matrix in `getProfileIndex()` in `app.js` maps time horizon and risk tolerance scores to profiles
- Adjust the `profiles` array to change allocation percentages or descriptions

## Disclaimer

This tool is for educational purposes only and does not constitute financial advice. Past performance does not guarantee future results. Please consult a qualified financial advisor before making investment decisions.
