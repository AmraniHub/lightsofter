#!/usr/bin/env node
/**
 * Daily blog post generator for Lightsofter
 * Picks a keyword cluster, asks Claude to write a full SEO article,
 * saves it as a markdown file in content/blog/
 * Run via GitHub Actions daily at 8:00 AM UTC
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

if (!ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY')
  process.exit(1)
}

// ── 16 Keyword Clusters ──────────────────────────────────────────────────────
const KEYWORD_CLUSTERS = [
  {
    keyword: 'création site web PME France prix 2025',
    category: 'Guide',
    subreddits: ['r/france', 'r/entrepreneurfr'],
    quora: 'Combien coûte la création d\'un site web pour une PME en France en 2025 ?',
  },
  {
    keyword: 'agence web Belgique tarif site vitrine PME',
    category: 'Guide',
    subreddits: ['r/belgium', 'r/entrepreneuriat'],
    quora: 'Quel est le prix d\'un site vitrine professionnel en Belgique ?',
  },
  {
    keyword: 'développeur application Android France PME pas cher',
    category: 'Android',
    subreddits: ['r/androiddev', 'r/france'],
    quora: 'Comment créer une application Android pour son entreprise sans se ruiner ?',
  },
  {
    keyword: 'refonte site web PME Belgique guide complet',
    category: 'Guide',
    subreddits: ['r/belgium', 'r/webdesign'],
    quora: 'Quand faut-il refaire son site web pour une PME belge ?',
  },
  {
    keyword: 'combien de temps créer site web professionnel',
    category: 'Guide',
    subreddits: ['r/webdev', 'r/france'],
    quora: 'Combien de temps faut-il pour créer un site web professionnel ?',
  },
  {
    keyword: 'site web e-commerce PME France 2025 guide',
    category: 'E-commerce',
    subreddits: ['r/ecommerce', 'r/france'],
    quora: 'Comment créer un site e-commerce pour une PME française en 2025 ?',
  },
  {
    keyword: 'application web sur mesure PME SaaS France',
    category: 'Web',
    subreddits: ['r/webdev', 'r/saas'],
    quora: 'Vaut-il mieux développer une application web sur mesure ou utiliser un SaaS existant ?',
  },
  {
    keyword: 'site vitrine restaurant Paris prix livraison rapide',
    category: 'Guide',
    subreddits: ['r/restauration', 'r/paris'],
    quora: 'Quel est le prix d\'un site web pour un restaurant à Paris ?',
  },
  {
    keyword: 'SEO site web PME France débutant guide 2025',
    category: 'SEO',
    subreddits: ['r/SEO', 'r/france'],
    quora: 'Comment améliorer le SEO d\'un site web de PME française en 2025 ?',
  },
  {
    keyword: 'application Android artisan France gestion client',
    category: 'Android',
    subreddits: ['r/androiddev', 'r/entrepreneurfr'],
    quora: 'Quelle application Android choisir pour gérer ses clients en tant qu\'artisan ?',
  },
  {
    keyword: 'agence web livraison rapide 2-3 jours site pro',
    category: 'Guide',
    subreddits: ['r/webdesign', 'r/france'],
    quora: 'Est-il possible de créer un site web professionnel en moins d\'une semaine ?',
  },
  {
    keyword: 'site web pharmacie cabinet médical France application',
    category: 'Web',
    subreddits: ['r/medecin', 'r/france'],
    quora: 'Comment créer un site web professionnel pour une pharmacie ou un cabinet médical ?',
  },
  {
    keyword: 'transformation digitale PME France comment commencer',
    category: 'Tendances',
    subreddits: ['r/france', 'r/entrepreneurfr'],
    quora: 'Par où commencer la transformation digitale d\'une PME française ?',
  },
  {
    keyword: 'coût application mobile Android PME budget guide',
    category: 'Android',
    subreddits: ['r/androiddev', 'r/mobiledev'],
    quora: 'Quel budget prévoir pour développer une application mobile Android pour une PME ?',
  },
  {
    keyword: 'site web notaire cabinet avocat professionnel France',
    category: 'Guide',
    subreddits: ['r/droit', 'r/france'],
    quora: 'Comment créer un site web professionnel pour un cabinet d\'avocat ou de notaire ?',
  },
  {
    keyword: 'meilleure agence web PME rapport qualité prix 2025',
    category: 'Guide',
    subreddits: ['r/france', 'r/webdev'],
    quora: 'Comment choisir la meilleure agence web pour une PME en 2025 ?',
  },
]

// ── Pick next keyword (rotate based on existing posts) ───────────────────────
function pickKeyword() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
  const existing = fs.readdirSync(BLOG_DIR).length
  return KEYWORD_CLUSTERS[existing % KEYWORD_CLUSTERS.length]
}

// ── Slug helper ──────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
}

// ── Call Claude API ──────────────────────────────────────────────────────────
async function generateArticle(cluster) {
  const today = new Date().toISOString().split('T')[0]

  const prompt = `Tu es un expert en marketing de contenu SEO pour les PME françaises et belges.
Écris un article de blog SEO complet en français pour le mot-clé cible : "${cluster.keyword}"

RÈGLES STRICTES :
1. Le mot-clé doit apparaître dans le titre (en début)
2. Le mot-clé doit apparaître dans les 100 premiers mots
3. Le mot-clé doit apparaître dans au moins un sous-titre H2
4. L'article doit faire entre 800 et 1200 mots
5. Utilise des sous-titres H2 et H3 (##, ###)
6. Ajoute un tableau comparatif si pertinent
7. Termine par un appel à l'action vers Lightsofter (agence web livraison en 2-3 jours)
8. Ton : professionnel mais accessible, pratique, concret
9. Catégorie : ${cluster.category}

FORMAT DE SORTIE (exactement ce format, rien d'autre) :
---
title: "[titre SEO avec le mot-clé]"
description: "[meta description 150-160 caractères avec le mot-clé]"
date: "${today}"
keywords: "${cluster.keyword}, [2-3 variantes]"
category: "${cluster.category}"
---

[contenu markdown complet ici]`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`)
  const data = await res.json()
  // Strip markdown code fences Claude sometimes wraps around the response
  const raw = data.content[0].text
  return raw.replace(/^```(?:markdown)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
}

// ── Send Telegram notification ───────────────────────────────────────────────
async function notifyTelegram(title, slug, redditPost, quoraAnswer) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  const text = [
    `✅ <b>Nouvel article publié !</b>`,
    ``,
    `📝 <b>${title}</b>`,
    `🔗 https://lightsofter.vercel.app/blog/${slug}`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `📣 <b>Post Reddit (à copier-coller) :</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    redditPost,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `💬 <b>Réponse Quora (à copier-coller) :</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    quoraAnswer,
  ].join('\n')

  // Split into chunks if too long (Telegram limit: 4096 chars)
  const chunks = []
  for (let i = 0; i < text.length; i += 4000) chunks.push(text.slice(i, i + 4000))

  for (const chunk of chunks) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: chunk, parse_mode: 'HTML' }),
    })
  }
}

// ── Generate Reddit post ─────────────────────────────────────────────────────
async function generateRedditPost(cluster, title, description) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Génère un court post Reddit (150 mots max) pour promouvoir cet article de blog de façon naturelle et non promotionnelle sur ${cluster.subreddits.join(' ou ')}.
Article : "${title}"
Description : "${description}"
Lien : https://lightsofter.vercel.app/blog/[slug]
Format : Titre Reddit + Corps du post (naturel, pas publicitaire, apporte de la valeur d'abord)`
      }],
    }),
  })
  const data = await res.json()
  return data.content[0].text
}

// ── Generate Quora answer ────────────────────────────────────────────────────
async function generateQuoraAnswer(cluster, title, description) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Génère une réponse professionnelle Quora (200 mots max) à cette question : "${cluster.quora}"
En te basant sur cet article : "${title}" - ${description}
Inclus un lien naturel vers l'article à la fin.
Lien : https://lightsofter.vercel.app/blog/[slug]
Ton : expert, helpful, pas trop promotionnel`
      }],
    }),
  })
  const data = await res.json()
  return data.content[0].text
}

// ── Generate image via Pollinations (free, no key needed) ────────────────────
const CATEGORY_HINTS = {
  Guide: 'professional business guide, laptop, notebook, France SMB consulting',
  SEO: 'SEO analytics dashboard, search engine optimization, data charts, digital marketing',
  'E-commerce': 'e-commerce online store, shopping cart, digital commerce, product catalog',
  Android: 'Android mobile app development, smartphone screen, code interface, modern UI',
  Web: 'web application development, browser dashboard, SaaS interface, modern design',
  Tendances: 'digital transformation innovation, futuristic technology, business evolution',
}

function generateImageUrl(cluster) {
  // Return a Pollinations URL directly — no download needed, no local file to commit
  const hint = CATEGORY_HINTS[cluster.category] || 'web agency professional digital'
  const prompt = encodeURIComponent(
    `${hint}, purple violet accent color, clean modern minimalist illustration, high quality, no text, no watermark`
  )
  const seed = Math.floor(Math.random() * 9999)
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&seed=${seed}&model=flux&nologo=true`
  console.log(`🖼️  Image URL: ${url}`)
  return url
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting blog post generation...')

  const cluster = pickKeyword()
  console.log(`📝 Keyword: ${cluster.keyword}`)

  // Generate article
  const articleContent = await generateArticle(cluster)

  // Extract title for slug
  const titleMatch = articleContent.match(/title:\s*"([^"]+)"/)
  const title = titleMatch ? titleMatch[1] : cluster.keyword
  const slug = `${slugify(title)}-${new Date().toISOString().split('T')[0]}`

  // Generate image in parallel with Reddit/Quora
  const descMatch = articleContent.match(/description:\s*"([^"]+)"/)
  const description = descMatch ? descMatch[1] : ''

  const imageUrl = generateImageUrl(cluster)
  const [redditPost, quoraAnswer] = await Promise.all([
    generateRedditPost(cluster, title, description),
    generateQuoraAnswer(cluster, title, description),
  ])

  // Inject image into frontmatter and save file
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  const finalContent = articleContent.replace(/^(---\n[\s\S]*?)(---)(\n)/, `$1image: "${imageUrl}"\n$2$3`)
  fs.writeFileSync(filePath, finalContent, 'utf-8')
  console.log(`✅ Article saved: ${filePath}`)

  // Notify Telegram
  await notifyTelegram(title, slug, redditPost, quoraAnswer)
  console.log('📱 Telegram notified')
  console.log('🎉 Done!')
}

main().catch(e => { console.error(e); process.exit(1) })
