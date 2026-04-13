# Electra Power Co. — Recruiting Website

Bilingual (Spanish-first) recruiting site for solar appointment setters in Miami, FL.

## Tech Stack

- **HTML5** — Semantic markup with Schema.org JobPosting
- **CSS3** — Custom properties, mobile-first responsive, no frameworks
- **JavaScript** — Vanilla JS, no frameworks
- **GSAP + ScrollTrigger** — Scroll animations and number counters
- **Lucide Icons** — SVG icon library

## Project Structure

```
electra-power-recruiting/
├── research/
│   ├── 01-client-brand.md         # Brand extraction from electrapowerco.com
│   ├── 02-competitor-analysis.md  # 10 competitors scored, top 5 analyzed
│   ├── 03-build-brief.md          # Master build plan
│   └── 04-quality-audit.md        # Final QA results
├── competitive-analysis.html      # PDF-ready client report (open in browser)
├── site/
│   ├── index.html                 # Main recruiting page
│   ├── 404.html                   # Custom 404 page
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── css/
│   │   └── styles.css             # All styles (mobile-first)
│   ├── js/
│   │   └── main.js                # Animations, form, language toggle
│   └── assets/                    # Images, favicon (add your own)
└── README.md
```

## Deployment

### Vercel (Recommended)

```bash
cd site
npx vercel
```

### Netlify

1. Drag the `site/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect via Git and set publish directory to `site/`

### Any Static Host

Upload the contents of the `site/` directory to your web server. No build step required.

## Before Going Live

1. **Replace placeholder images** — Team photos in Culture section, video testimonials
2. **Verify earnings figures** — Confirm $800/$1,500/$3,000 weekly numbers are accurate
3. **Connect form endpoint** — Replace `console.log` in `main.js` with your CRM/webhook
4. **Add favicon** — Save your logo as `assets/favicon.png`
5. **Create OG image** — 1200x630px social sharing image at `assets/og-image.jpg`
6. **Set up domain** — Point careers.electrapowerco.com to your host
7. **Test WhatsApp link** — Verify the phone number in the floating button

## Features

- Spanish-first with EN/ES language toggle
- GSAP scroll animations with `prefers-reduced-motion` support
- Smart screening form (location + language, no age)
- Animated earnings counters
- Mobile-first responsive (375px → 1440px)
- WhatsApp floating CTA
- Schema.org JobPosting structured data
- 404 page
- PDF-ready competitive analysis report
