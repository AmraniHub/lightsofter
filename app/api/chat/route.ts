import { NextResponse } from 'next/server'

function buildSystemPrompt(locale: string) {
  const isFr = locale !== 'en'
  return isFr ? `Tu es l'assistant virtuel de Lightsofter, une agence web spécialisée dans la création de sites professionnels et d'applications pour les PME en France, Belgique, Suisse et Monaco.

SERVICES ET TARIFS :
- Site vitrine professionnel : à partir de 490€, livré en 2-3 jours
- Site e-commerce : à partir de 890€, livré en 7 jours
- Application web sur mesure (SaaS, tableau de bord) : à partir de 790€
- Application Android native : à partir de 990€
- Refonte de site existant : à partir de 390€
- Devis gratuit sous 24h pour tous les projets

AVANTAGES LIGHTSOFTER :
- Livraison en 2-3 jours garantie
- Satisfait ou remboursé
- Support inclus 30 jours après livraison
- Expertise PME France, Belgique, Suisse & Monaco depuis plusieurs années

NAVIGATION — ajoute ces balises quand c'est pertinent :
- Formulaire de devis → [ACTION:scroll:devis]
- Portfolio / réalisations → [ACTION:scroll:realisations]
- Tarifs / offres → [ACTION:scroll:tarifs]
- Témoignages clients → [ACTION:scroll:temoignages]
- Blog → [ACTION:navigate:/blog]
- Contact → [ACTION:navigate:/contact]

RÈGLES :
1. Réponds UNIQUEMENT en français, avec un langage clair, professionnel et chaleureux
2. Réponses courtes et directes — 2 à 3 phrases maximum
3. Si quelqu'un montre de l'intérêt pour un projet → demande son prénom puis son email ou téléphone
4. Ne donne jamais de prix ferme pour un projet complexe → propose un devis gratuit
5. Termine toujours par une action concrète (balise navigation ou question)
6. Maximum 1 emoji par message` :
  `You are the virtual assistant for Lightsofter, a web agency specialising in professional websites and applications for SMBs in France, Belgium, Switzerland and Monaco.

SERVICES & PRICING:
- Professional showcase website: from €490, delivered in 2-3 days
- E-commerce website: from €890, delivered in 7 days
- Custom web application (SaaS, dashboard): from €790
- Native Android application: from €990
- Website redesign: from €390
- Free quote within 24h for all projects

LIGHTSOFTER ADVANTAGES:
- 2-3 day delivery — guaranteed
- Satisfaction or money-back guarantee
- 30-day post-delivery support included
- SMB specialists in France, Belgium, Switzerland & Monaco

NAVIGATION — add these tags when relevant:
- Quote form → [ACTION:scroll:devis]
- Portfolio / projects → [ACTION:scroll:realisations]
- Pricing / offers → [ACTION:scroll:tarifs]
- Client testimonials → [ACTION:scroll:temoignages]
- Blog → [ACTION:navigate:/blog]
- Contact → [ACTION:navigate:/contact]

RULES:
1. Respond ONLY in English, with clear, professional and warm language
2. Short and direct responses — 2 to 3 sentences maximum
3. If someone shows interest in a project → ask for their first name then email or phone
4. Never give firm prices for complex projects → offer a free quote instead
5. Always end with a concrete action (navigation tag or a question)
6. Maximum 1 emoji per message`
}

// ── Regex ────────────────────────────────────────────────────────────────────
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const PHONE_RE = /(?:\+?[\d][\d\s\-(). ]{6,}[\d])/

// ── Extract name from full conversation ──────────────────────────────────────
function extractName(messages: { role: string; content: string }[]): string {
  const userText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join(' ')

  const patterns = [
    /je m['']appelle\s+([A-ZÀ-Öa-zà-ö]{2,20})/i,
    /mon prénom(?: est)?\s+([A-ZÀ-Öa-zà-ö]{2,20})/i,
    /c['']est\s+([A-ZÀ-Öa-zà-ö]{2,20})/i,
    /prénom\s*[:\-]?\s*([A-ZÀ-Öa-zà-ö]{2,20})/i,
    /my name is\s+([A-Za-z]{2,20})/i,
    /i['']?m\s+([A-Z][a-z]{2,20})/i,
    /call me\s+([A-Za-z]{2,20})/i,
    /name\s*[:\-]?\s*([A-Za-z]{2,20})/i,
  ]
  for (const p of patterns) {
    const m = userText.match(p)
    if (m?.[1]) return m[1]
  }
  return ''
}

// ── Build short project summary from user messages ───────────────────────────
function buildSummary(messages: { role: string; content: string }[]): string {
  return messages
    .filter(m => m.role === 'user')
    .map(m => m.content.trim())
    .join(' › ')
    .substring(0, 500)
}

// ── Send lead to Telegram + Google Sheets ────────────────────────────────────
async function captureLead(opts: {
  email?: string
  phone?: string
  name?: string
  summary: string
  locale: string
}) {
  const { email, phone, name, summary, locale } = opts
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK

  const date = new Date().toLocaleString(locale === 'en' ? 'en-GB' : 'fr-FR', { timeZone: 'Europe/Paris' })

  // ── Telegram ──────────────────────────────────────────────────────────────
  if (token && chatId) {
    const lines: string[] = [
      `🔥 <b>Nouveau lead — Chatbot Lightsofter</b>`,
      ``,
      name  ? `👤 <b>${name}</b>`  : '',
      email ? `📧 ${email}`        : '',
      phone ? `📞 ${phone}`        : '',
      ``,
      `💬 <b>Conversation :</b>`,
      `<i>${summary.substring(0, 300)}</i>`,
      ``,
      `🕐 ${date}`,
      `🌐 Source : chatbot`,
    ]

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.filter(Boolean).join('\n'),
        parse_mode: 'HTML',
      }),
    }).catch(() => {})
  }

  // ── Google Sheets ─────────────────────────────────────────────────────────
  if (sheetsUrl) {
    const params = new URLSearchParams({
      name:    name    || 'Chat lead',
      email:   email   || '',
      phone:   phone   || '',
      project: summary.substring(0, 400),
      source:  'chatbot',
    })
    await fetch(`${sheetsUrl}?${params.toString()}`).catch(() => {})
  }
}

// ── POST ─────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const { message, history = [], locale = 'fr' } = await req.json()
    if (!message?.trim()) return NextResponse.json({ reply: '' })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return NextResponse.json({ reply: 'Service temporairement indisponible.' })

    const allUserMessages = [
      ...history,
      { role: 'user', content: message },
    ] as { role: string; content: string }[]

    const claudeMessages = allUserMessages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }))

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 350,
        system: buildSystemPrompt(locale),
        messages: claudeMessages,
      }),
    })

    if (!res.ok) return NextResponse.json({ reply: 'Désolé, une erreur est survenue. Réessayez dans un instant.' })

    const data = await res.json()
    const reply: string = data.content?.[0]?.text ?? ''

    // ── Lead detection across current message ─────────────────────────────
    const emailMatch = message.match(EMAIL_RE)
    const phoneMatch = message.match(PHONE_RE)

    if (emailMatch || phoneMatch) {
      const name    = extractName(allUserMessages)
      const summary = buildSummary(allUserMessages)
      await captureLead({
        email:   emailMatch?.[0],
        phone:   phoneMatch?.[0],
        name,
        summary,
        locale,
      })
    }

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: 'Désolé, une erreur est survenue.' })
  }
}
