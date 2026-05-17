# Lightsofter — Master Plan

## What this project is
A Next.js 14 web agency site for French/Belgian SMBs (lightsofter.vercel.app).
One-person agency: owner takes orders, AI generates client sites, Vercel hosts everything.

---

## Business model
- **One-time fee**: Essentiel €490 / Pro €790
- **Maintenance upsell** (pitched after delivery): €29/mo basic · €49/mo pro
- **Domain ownership**: register all client domains under owner's OVH account, charge €25/yr
- **Break-even floor**: 15 maintenance clients × €29 = €435/mo covers all fixed costs

---

## Tech stack
- Next.js 14.2.5 App Router + TypeScript + Tailwind CSS
- Zero-dependency i18n via React Context (`LangProvider` / `useT()`) — FR/EN
- Claude Haiku (`claude-haiku-4-5-20251001`) for chatbot + blog + site generation
- Stripe for payments and recurring subscriptions
- Telegram Bot API for all notifications (orders, leads, weekly report)
- Google Sheets via Apps Script webhook for lead capture
- GitHub Actions for automation (deploy, blog generation, weekly report, site generation)
- Vercel for hosting (main site + all client sites)
- File-based blog: `.md` files in `content/blog/`, images in `public/blog-images/`
- Pollinations API (free) for AI blog images

---

## What is DONE ✅

### Main site (lightsofter.vercel.app)
- [x] Full landing page: Hero, Services, TrustBar, HowItWorks, Portfolio, Pricing, Testimonials, FAQ, CTA, Footer
- [x] Navbar with Blog link + "Commander →" button
- [x] Bilingual (FR/EN) via `lib/i18n.ts` + `LangProvider` — all pages and components
- [x] Scroll-to-top button (bottom-left, appears after 400px)
- [x] WhatsApp button (bottom-right, +212627716149)
- [x] ChatWidget (FR chatbot, lead capture → Telegram + Google Sheets)
- [x] All policy pages bilingual: mentions-légales, politique-confidentialité, CGV, politique-remboursement
- [x] Delivery times set to 2-3 days everywhere (FR: "3j", EN: "3D" in stats)

### Blog
- [x] `/blog` listing page with Pollinations AI images
- [x] `/blog/[slug]` post page with hero image + OG image
- [x] `lib/blog.ts` with gray-matter + marked
- [x] `scripts/generate-blog-post.mjs` — daily AI blog generation with Pollinations images
- [x] GitHub Action: `generate-blog.yml` — daily 8AM UTC

### SEO & infrastructure
- [x] JSON-LD schemas: Organization, WebSite, ProfessionalService
- [x] `sitemap.ts` + `robots.ts`
- [x] GA4 tracking script (`NEXT_PUBLIC_GA_ID` env var)
- [x] `app/api/telegram` webhook

### Order & payment flow
- [x] `/order` — 4-step intake form (package → business → content → contact)
- [x] `/order/success` — confirmation page
- [x] `app/api/checkout/route.ts` — Stripe Checkout session creation
- [x] `app/api/webhooks/stripe/route.ts` — payment confirmation → Telegram notification + auto-generate Stripe subscription checkout link for maintenance clients

### Automation / GitHub Actions
- [x] `deploy.yml` — Vercel deploy on push
- [x] `generate-blog.yml` — daily blog post generation
- [x] `weekly-seo-report.yml` — Monday 8AM UTC Telegram report
- [x] `scripts/weekly-report.py` — standalone Python script for the report
- [x] `generate-client-site.yml` — manual trigger: takes Stripe session ID → generates site → creates GitHub repo → Telegram notification

### Template engine (factory)
- [x] `scripts/generate-site.mjs` — reads order JSON or Stripe session → calls Claude API → generates full `site-config.json`
- [x] `client-template/` — complete Next.js 14 site driven by `site-config.json`:
  - Navbar, Hero, Services, About, Testimonials, FAQ, CtaSection, ContactSection, Footer
  - Contact form → Telegram notification
  - CSS variables for brand colors (set from `site-config.json`)
  - All copy AI-generated per client

---

## What is PENDING 🔲

### High priority
- [ ] **Vercel auto-deploy for client sites** — after `generate-client-site.yml` creates the GitHub repo, use Vercel API to auto-create the project and trigger first deploy. Currently manual step in Vercel dashboard.
  - API endpoint: `POST https://api.vercel.com/v10/projects` with `gitRepository` body
  - Needs `VERCEL_TOKEN` + `VERCEL_TEAM_ID` as GitHub Secrets

- [ ] **Stripe subscription prices** — create in Stripe dashboard:
  - €29/mo basic → set `STRIPE_PRICE_MAINT_BASIC=price_xxx` in Vercel
  - €49/mo pro → set `STRIPE_PRICE_MAINT_PRO=price_xxx` in Vercel

- [ ] **OVH domain registrar account** — register all new client domains there, not manually per registrar

### Medium priority
- [ ] **Client dashboard** — private `/dashboard` page (password-protected) showing all active client sites, renewal dates, maintenance status. Simple table pulling from a JSON or Notion DB.

- [ ] **AI update tool** — private `/admin` page where owner types a plain-text change request → Claude patches the relevant client site files → auto-commits to GitHub → Vercel redeploys

- [ ] **More client site templates** — currently 1 template (vitrine). Add:
  - `ecommerce` template (product grid, cart, Stripe checkout)
  - `service-pro` template (booking/calendar integration)

- [ ] **Maintenance delivery automation** — after `generate-client-site.yml` completes, automatically send the subscription checkout link to the client by email

### Low priority / Nice to have
- [ ] **Stripe billing portal** — let maintenance clients manage their subscription themselves (cancel, update card)
- [ ] **Monthly SEO report per client** — adapt `scripts/weekly-report.py` to send per-client reports
- [ ] **Blog auto-linking** — when a new blog post is generated, auto-post a teaser to the Telegram channel
- [ ] **Portfolio auto-update** — when a client site goes live, auto-add it to the Portfolio section of the main site

---

## Required environment variables

### Vercel (main site)
| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Telegram chat ID |
| `TELEGRAM_WEBHOOK_SECRET` | Secret for Telegram webhook endpoint |
| `GOOGLE_SHEETS_WEBHOOK` | Apps Script URL for lead capture |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_MAINT_BASIC` | Stripe price ID for €29/mo maintenance |
| `STRIPE_PRICE_MAINT_PRO` | Stripe price ID for €49/mo maintenance |
| `NEXT_PUBLIC_BASE_URL` | `https://lightsofter.vercel.app` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (optional) |

### GitHub Secrets (for Actions)
| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key (blog generation + site generation) |
| `STRIPE_SECRET_KEY` | Stripe (for fetching session data in site generator) |
| `TELEGRAM_BOT_TOKEN` | Telegram notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat ID |
| `GH_PAT` | GitHub Personal Access Token with `repo` scope (to create client repos) |
| `VERCEL_TOKEN` | Vercel API token (needed for auto-deploy — pending) |

### Per client site (Vercel env vars)
| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Same bot token (contact form notifications) |
| `TELEGRAM_CHAT_ID` | Same chat ID |

---

## Key file map
```
lightsofter/
├── app/
│   ├── page.tsx                    ← Main landing page
│   ├── layout.tsx                  ← Root layout (Navbar, WhatsApp, ScrollToTop, Chat)
│   ├── blog/                       ← Blog listing + post pages
│   ├── order/                      ← 4-step intake form + success page
│   ├── api/
│   │   ├── chat/route.ts           ← ChatWidget AI backend
│   │   ├── checkout/route.ts       ← Stripe checkout session
│   │   ├── webhooks/stripe/        ← Payment confirmation + subscription link
│   │   └── telegram/route.ts       ← Telegram webhook
│   └── (policy pages)
├── components/
│   ├── LangProvider.tsx            ← i18n context
│   ├── ChatWidget.tsx              ← AI chatbot
│   ├── Navbar.tsx                  ← Nav with Commander button
│   └── (all section components)
├── lib/
│   ├── i18n.ts                     ← All FR/EN translations
│   └── blog.ts                     ← Blog post parsing
├── scripts/
│   ├── generate-blog-post.mjs      ← Daily blog AI generator
│   ├── generate-site.mjs           ← Client site AI generator ⭐
│   └── weekly-report.py            ← Weekly SEO Telegram report
├── client-template/                ← Template for all client sites ⭐
│   ├── site-config.json            ← All content (replaced per client by AI)
│   ├── app/                        ← Next.js app (reads from site-config.json)
│   └── components/                 ← 9 section components
├── content/blog/                   ← Blog .md files
├── public/blog-images/             ← AI-generated blog images
└── .github/workflows/
    ├── deploy.yml
    ├── generate-blog.yml
    ├── weekly-seo-report.yml
    └── generate-client-site.yml    ← Manual: Stripe session → new client site ⭐
```

---

## How to generate a new client site (current flow)

1. Client pays on `/order` → Stripe webhook fires → you get Telegram notification with all details
2. Go to GitHub Actions → **Generate Client Site** → paste the `cs_live_xxx` session ID
3. Action runs: Claude generates all content → creates `generated/{slug}/` → pushes to new private GitHub repo
4. You receive Telegram: repo URL + Vercel import link
5. Go to vercel.com/new → import the new repo → set env vars → deploy
6. Point client domain in Vercel settings
7. Send client the maintenance subscription link (included in the original Telegram notification)

**Target time per client: 15 minutes.**

---

## Next session — start here
The highest-value next task is **Vercel auto-deploy** (item 1 in High Priority).
After that: **client dashboard** to track all sites and renewals.
