# Phase 4: Website Build Brief — Electra Power Co. Recruiting Site

**Date:** April 11, 2026
**Purpose:** Bilingual recruiting website to attract young Spanish-speaking appointment setters in Miami

---

## Design Direction

### Color Palette
| Role | Hex | Why |
|------|-----|-----|
| **Primary Purple** | #673de6 | Electra's brand — distinctive in solar (competitors use orange/blue/green) |
| **Electric Gold** | #FFD700 | Money/success signaling — critical for earnings messaging |
| **Deep Dark** | #0D0B1A | Premium dark sections, hero backgrounds |
| **Teal Green** | #00b090 | From Electra brand — trust, success states |
| **Pure White** | #FFFFFF | Clean contrast, card backgrounds |
| **Text Light** | #B8B0D0 | Secondary text on dark backgrounds |

### Typography
- **Headlines:** Space Grotesk Bold — modern, tech-forward, works in Spanish and English
- **Body:** DM Sans — clean, neutral, highly readable
- **Money Numbers:** Space Grotesk at 60-80px — scroll-stopping earning figures

### Photography/Asset Style
- **Real Miami imagery** — Brickell skyline, Wynwood murals, South Beach energy
- **Young, diverse team photos** — reflect the actual demographic
- **Lifestyle shots** — cars, travel, team events, nightlife
- **Video testimonials** from current setters (placeholder for now)
- **NO stock photography** that looks generic

### Animation Recommendations
- GSAP + ScrollTrigger for all scroll animations
- Animated number counters for earnings ($1,500/week counting up)
- Parallax depth on lifestyle imagery
- Card stagger reveals on benefits section
- Smooth hero entrance with text slide-up
- 3D scroll asset placeholder in hero (for future video content)
- `prefers-reduced-motion` support throughout

### What to AVOID
- Corporate tone (Sunrun style)
- Generic ATS templates (Paylocity, Workable)
- English-only content
- Long application forms
- Desktop-first layout
- Vague compensation ("competitive pay")
- Stock photography

---

## Site Architecture

**Single-page scrolling site** (matching the target demo's mobile behavior)

### Section-by-Section Plan

| # | Section | Purpose | Key Content |
|---|---------|---------|-------------|
| 1 | **Hero** | Stop the scroll, show the money | Big earnings number, lifestyle background, "Aplica Ahora" CTA |
| 2 | **The Opportunity** | What this is and why it matters | Solar industry growth, appointment setting explained, no experience needed |
| 3 | **What You'll Earn** | Specific compensation breakdown | Weekly/monthly/annual earning potential with visual counters |
| 4 | **Culture & Team** | Show the lifestyle | Team photos, events, Miami life, "somos familia" messaging |
| 5 | **How It Works** | Remove confusion | 3 steps: Aplica → Entrena → Gana (Apply → Train → Earn) |
| 6 | **Testimonials** | Social proof from peers | Video placeholder + written quotes from current setters |
| 7 | **Benefits & Perks** | The full package | Training, flexibility, team events, growth path, weekly pay |
| 8 | **Application Form** | Convert visitors to applicants | Smart screening form (details below) |
| 9 | **FAQ** | Handle objections | Common questions about solar sales, pay structure, schedule |
| 10 | **Footer** | Contact & legal | Office address, phone, social links, legal disclaimer |

### Navigation
- Sticky top nav with Electra logo
- Language toggle (ES/EN) — Spanish default
- "Aplica Ahora" button always visible in nav
- Smooth scroll to sections
- Mobile hamburger menu

---

## Content Framework

### Homepage Headline — 3 Options

**Option A (Money-First):**
> "Gana $1,500+ por semana vendiendo el futuro de la energía"
> (Earn $1,500+ per week selling the future of energy)

**Option B (Lifestyle-First):**
> "Tu próximo trabajo no es un trabajo. Es un estilo de vida."
> (Your next job isn't a job. It's a lifestyle.)

**Option C (Community-First):**
> "Únete al equipo que está cambiando Miami — una casa a la vez"
> (Join the team that's changing Miami — one home at a time)

### Value Proposition Structure
1. **The Hook:** Specific dollar amount (weekly earnings)
2. **The Promise:** No experience needed, we train you
3. **The Proof:** Testimonials from people like you
4. **The CTA:** Apply in 60 seconds

### Section-by-Section Copy Direction

**Hero:** Lead with the biggest number you can honestly claim. "$1,500+ por semana" or whatever the real top-performer earnings are. Background should feel like Miami nightlife/energy — not a solar panel farm.

**The Opportunity:** "La industria solar está explotando en Florida. Cada casa necesita paneles. Y nosotros necesitamos gente como tú para conectar con familias hispanas que quieren ahorrar dinero." (Solar is exploding in Florida. Every home needs panels. And we need people like you to connect with Hispanic families who want to save money.)

**What You'll Earn:** Animated counters showing weekly, monthly, yearly potential. Include tiers: "Nuevo" (new), "Intermedio" (intermediate), "Elite." Show the math transparently.

**Culture:** "Somos familia. Somos de Miami. Somos jóvenes. Y estamos ganando." (We're family. We're from Miami. We're young. And we're winning.) Show real team photos — no suits, no corporate headshots.

**How It Works:** Three simple steps with icons. Apply → Train (paid, 1 week) → Start earning. Remove all perceived risk.

**Testimonials:** Placeholder for video embeds. Written quotes in Spanish from current setters with first name, neighborhood, and earnings: "En mi primer mes gané $4,200" — Luis, Hialeah

**Application Form:** Short, smart, screening (see below)

### SEO Keyword Targets
- "trabajo solar Miami" (primary — zero competition)
- "empleo ventas solar Florida"
- "ganar dinero vendiendo solar"
- "solar appointment setter Miami"
- "trabajo de ventas Miami sin experiencia"

---

## Screening & Application Form

### Form Fields (4-field initial screen)
1. **Nombre completo** (Full name) — text input
2. **Teléfono / WhatsApp** (Phone/WhatsApp) — tel input
3. **¿En qué zona de Miami vives?** (What area of Miami do you live in?) — dropdown: Hialeah, Doral, Kendall, Homestead, Miami Beach, Little Havana, Brickell, Otro (Other)
4. **¿Hablas español con fluidez?** (Do you speak Spanish fluently?) — Yes/No

### Smart Screening Logic
- If the person selects a Miami-area neighborhood → qualifies
- If they select "Otro" → they get a follow-up: "¿En qué ciudad vives?" — this naturally screens for location without rejecting anyone outright
- Spanish fluency is a job requirement (communicating with Hispanic homeowners) — this is a legitimate BFOQ (bona fide occupational qualification)
- **No age question in the form** — the site's culture, imagery, and messaging will naturally attract the target demographic without creating legal risk

### After Submission
- Thank you screen with next steps
- "Te contactaremos por WhatsApp en las próximas 24 horas" (We'll contact you via WhatsApp within 24 hours)
- Optional: link to follow on Instagram/TikTok for culture content

---

## Conversion Playbook

### Primary Conversion Goal
Get the phone/WhatsApp number of qualified Miami-based Spanish-speaking candidates.

### Lead Capture Strategy
- Sticky "Aplica Ahora" CTA in nav (always visible)
- Hero CTA above the fold
- Mid-page CTA after earnings section
- Final CTA in application section
- WhatsApp floating button for instant contact

### Social Proof Plan
| Type | Placement | Content |
|------|-----------|---------|
| Earnings testimonials | After "What You'll Earn" | Specific dollar amounts from real setters |
| Team photos | Culture section | Candid shots of real team members |
| Video testimonials | Dedicated section | 30-60 second clips (placeholder for now) |
| Company stats | Throughout | Team size, homes served, years in business |
| Instagram feed | Footer area | Live feed showing team culture |

### Trust Signal Checklist
- [ ] Electra Power Co. logo and branding
- [ ] Real office address (Doral, FL)
- [ ] Phone number prominently displayed
- [ ] WhatsApp contact option
- [ ] "25 years of guarantees" from parent company
- [ ] Team photos of actual employees
- [ ] Specific (not inflated) earnings data

---

## Technical Requirements

- **HTML + CSS + JavaScript** — no frameworks, fully portable
- **GSAP + ScrollTrigger** for animations
- **Mobile-first responsive** — 320px base, scales up
- **Spanish as default language** — English toggle available
- **Semantic HTML5** with proper heading hierarchy
- **Schema markup** for JobPosting
- **Open Graph tags** optimized for WhatsApp/Instagram sharing
- **Lighthouse 90+** target on all metrics
- **prefers-reduced-motion** respected
- **Lazy loading** on all images
- **No render-blocking resources**

---

## Bilingual Strategy

- **Spanish is the PRIMARY language** — not a translation, the main content
- English version available via toggle
- All form fields, CTAs, and navigation in Spanish by default
- Meta tags and OG tags in Spanish
- URL structure: main page in Spanish, /en/ for English variant (or JS toggle)

---

## What This Is NOT

This is **not** a customer-facing solar sales site. This is a **talent acquisition funnel** designed to:
1. Attract young Spanish-speaking appointment setters in Miami
2. Screen for location (Miami) and language (Spanish fluency)
3. Capture their contact info (especially WhatsApp)
4. Sell them on Electra Power Co. as the best team to join

The existing electrapowerco.com site serves customers. This recruiting site is a separate, purpose-built tool.
