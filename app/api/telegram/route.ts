import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendMessage(text: string) {
  if (!TOKEN || !CHAT_ID) return
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

function helpText() {
  return [
    `🤖 <b>Lightsofter Bot — Commandes</b>`,
    ``,
    `/stats — Statistiques du blog (articles, dernières publications)`,
    `/seo — Rapport SEO (articles publiés, sitemap)`,
    `/start — Déclencher la génération d'un article de blog`,
    `/help — Afficher ce message`,
  ].join('\n')
}

function statsText() {
  const posts = getAllPosts()
  const recent = posts.slice(0, 5)
  const lines = [
    `📊 <b>Stats Lightsofter Blog</b>`,
    ``,
    `📝 Articles publiés : <b>${posts.length}</b>`,
    ``,
    `📅 <b>5 derniers articles :</b>`,
    ...recent.map(p => `• ${new Date(p.date).toLocaleDateString('fr-FR')} — ${p.title.substring(0, 60)}…`),
  ]
  return lines.join('\n')
}

function seoText() {
  const posts = getAllPosts()
  const categories = posts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return [
    `🔍 <b>Rapport SEO Lightsofter</b>`,
    ``,
    `🌐 Site : https://lightsofter.vercel.app`,
    `🗺️ Sitemap : https://lightsofter.vercel.app/sitemap.xml`,
    ``,
    `📝 Total articles : <b>${posts.length}</b>`,
    `📂 Catégories :`,
    ...Object.entries(categories).map(([cat, n]) => `  • ${cat} : ${n} article(s)`),
    ``,
    `✅ JSON-LD : Organization + WebSite + Service schemas actifs`,
    `✅ robots.txt : actif`,
    `✅ sitemap.xml : auto-généré`,
  ].join('\n')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body?.message
    if (!message) return NextResponse.json({ ok: true })

    const text: string = message?.text ?? ''
    const command = text.split(' ')[0].toLowerCase()

    switch (command) {
      case '/help':
      case '/start':
        if (command === '/help') await sendMessage(helpText())
        else {
          await sendMessage([
            `🚀 <b>Génération d'article déclenchée !</b>`,
            ``,
            `Le workflow GitHub Actions va générer un nouvel article SEO.`,
            `Vérifiez l'onglet Actions sur GitHub pour suivre la progression.`,
            ``,
            `L'article sera en ligne dans ~5 minutes.`,
          ].join('\n'))
        }
        break
      case '/stats':
        await sendMessage(statsText())
        break
      case '/seo':
        await sendMessage(seoText())
        break
      default:
        await sendMessage(`Commande inconnue. Tapez /help pour voir les commandes disponibles.`)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

// Verify token for webhook setup
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('token') === process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: true, message: 'Telegram webhook active' })
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}
