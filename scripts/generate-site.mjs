#!/usr/bin/env node
/**
 * AI Site Generator
 * Usage: node scripts/generate-site.mjs --order order.json
 *        node scripts/generate-site.mjs --session <stripe_session_id>
 *
 * Reads order data, calls Claude API to generate full site content,
 * copies client-template/ to generated/<slug>/ with site-config.json filled in.
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { execSync } from 'child_process'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const STRIPE_SECRET_KEY  = process.env.STRIPE_SECRET_KEY

// ── helpers ──────────────────────────────────────────────────────────────────

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: 'POST', headers }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', reject)
    req.write(JSON.stringify(body))
    req.end()
  })
}

function get(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: 'GET', headers }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', reject)
    req.end()
  })
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

// ── fetch order from Stripe if --session is given ────────────────────────────

async function fetchOrderFromStripe(sessionId) {
  const data = await get(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    { Authorization: `Bearer ${STRIPE_SECRET_KEY}` }
  )
  return data.metadata ?? {}
}

// ── Claude content generation ─────────────────────────────────────────────────

async function generateContent(order) {
  const prompt = `You are an expert web copywriter for French/Belgian SMBs.
Generate complete website content for this business. Reply ONLY with a valid JSON object — no markdown, no explanation.

Business info:
- Name: ${order.businessName}
- Sector: ${order.sector}
- Tagline: ${order.tagline}
- Services: ${order.services}
- About: ${order.about || 'Not provided'}
- Style preference: ${order.style}
- Preferred colors: ${order.colors || 'Not specified'}
- Country: ${order.country}
- Inspiration sites: ${order.examples || 'None'}

Generate this exact JSON structure (write in French if country is FR or BE, English otherwise):
{
  "meta": {
    "title": "...",
    "description": "...",
    "keywords": "..."
  },
  "design": {
    "primaryColor": "#hex",
    "accentColor": "#hex",
    "style": "${order.style}"
  },
  "hero": {
    "headline": "...",
    "subheadline": "...",
    "ctaText": "...",
    "ctaSecondaryText": "..."
  },
  "services": [
    { "icon": "emoji", "title": "...", "description": "...", "price": "..." },
    { "icon": "emoji", "title": "...", "description": "...", "price": "..." },
    { "icon": "emoji", "title": "...", "description": "...", "price": "..." }
  ],
  "about": {
    "title": "...",
    "paragraph1": "...",
    "paragraph2": "...",
    "stats": [
      { "value": "...", "label": "..." },
      { "value": "...", "label": "..." },
      { "value": "...", "label": "..." }
    ]
  },
  "testimonials": [
    { "name": "...", "role": "...", "text": "...", "rating": 5 },
    { "name": "...", "role": "...", "text": "...", "rating": 5 },
    { "name": "...", "role": "...", "text": "...", "rating": 5 }
  ],
  "faq": [
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." },
    { "q": "...", "a": "..." }
  ],
  "cta": {
    "headline": "...",
    "subtext": "...",
    "buttonText": "..."
  },
  "contact": {
    "title": "...",
    "subtitle": "...",
    "phone": "${order.phone || ''}",
    "email": "${order.email || ''}",
    "address": "",
    "hours": ""
  }
}`

  const result = await post(
    'https://api.anthropic.com/v1/messages',
    {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }
  )

  const raw = result.content?.[0]?.text ?? '{}'
  // Strip markdown code blocks if present
  const clean = raw.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(clean)
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  let order = {}

  if (args.includes('--order')) {
    const file = args[args.indexOf('--order') + 1]
    order = JSON.parse(fs.readFileSync(file, 'utf8'))
  } else if (args.includes('--session')) {
    const sessionId = args[args.indexOf('--session') + 1]
    console.log(`Fetching order from Stripe session ${sessionId}...`)
    order = await fetchOrderFromStripe(sessionId)
  } else {
    console.error('Usage: node scripts/generate-site.mjs --order order.json')
    console.error('       node scripts/generate-site.mjs --session cs_xxx')
    process.exit(1)
  }

  if (!order.businessName) { console.error('Missing businessName in order data'); process.exit(1) }

  const siteSlug = slug(order.businessName)
  const outDir   = path.join('generated', siteSlug)
  const tmplDir  = 'client-template'

  console.log(`\n🤖 Generating content for "${order.businessName}"...`)
  const content = await generateContent(order)
  console.log('✅ Content generated')

  // Build final site-config.json
  const config = {
    business: {
      name: order.businessName,
      sector: order.sector,
      slug: siteSlug,
      phone: order.phone ?? '',
      email: order.email ?? '',
      country: order.country ?? 'FR',
    },
    ...content,
  }

  // Copy template
  if (!fs.existsSync(tmplDir)) {
    console.error(`client-template/ directory not found. Did you forget to create it?`)
    process.exit(1)
  }

  console.log(`📁 Copying template to ${outDir}/...`)
  copyDir(tmplDir, outDir)

  // Write config
  fs.writeFileSync(path.join(outDir, 'site-config.json'), JSON.stringify(config, null, 2))
  console.log('✅ site-config.json written')

  // Update package.json name
  const pkgPath = path.join(outDir, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    pkg.name = siteSlug
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  }

  console.log(`\n🎉 Site ready at: ${outDir}/`)
  console.log(`\nNext steps:`)
  console.log(`  1. cd ${outDir} && npm install && npm run dev  (preview locally)`)
  console.log(`  2. Push to GitHub: gh repo create ${siteSlug} --private --push --source=${outDir}`)
  console.log(`  3. Import project in Vercel → auto-deploy`)
  console.log(`  4. Point client domain in Vercel settings`)
}

main().catch(e => { console.error(e); process.exit(1) })
