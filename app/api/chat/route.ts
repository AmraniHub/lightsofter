import { NextResponse } from 'next/server'

function buildSystemPrompt(locale: string) {
  const isFr = locale !== 'en'
  return isFr ? `Tu es l'assistant virtuel de Lightsofter, une agence web spécialisée dans la création de sites professionnels et d'applications pour les PME françaises et belges.

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
- Expertise PME France & Belgique depuis plusieurs années

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
  `You are the virtual assistant for Lightsofter, a web agency specialising in professional websites and applications for SMBs in France and Belgium.

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
- SMB specialists in France & Belgium

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

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const PHONE_RE = /(?:\+?[\d][\d\s\-().]{6,}[\d])/

async function captureLead(message: string, email?: string, phone?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (token && chatId) {
    const text = [
      `🔥 <b>Nouveau lead — Chatbot Lightsofter</b>`,
      ``,
      email ? `📧 ${email}` : '',
      phone ? `📞 ${phone}` : '',
      `💬 "${message.substring(0, 200)}"`,
      `🕐 ${new Date().toLocaleString('fr-FR')}`,
    ].filter(Boolean).join('\n')

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    }).catch(() => {})
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK
  if (sheetsUrl) {
    const params = new URLSearchParams({
      name: 'Chat lead',
      email: email || '',
      phone: phone || '',
      project: message.substring(0, 300),
      source: 'chatbot',
    })
    await fetch(`${sheetsUrl}?${params}`).catch(() => {})
  }
}

export async function POST(req: Request) {
  try {
    const { message, history = [], locale = 'fr' } = await req.json()
    if (!message?.trim()) return NextResponse.json({ reply: '' })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return NextResponse.json({ reply: 'Service temporairement indisponible.' })

    const messages = [
      ...history.slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ]

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
        messages,
      }),
    })

    if (!res.ok) return NextResponse.json({ reply: 'Désolé, une erreur est survenue. Réessayez dans un instant.' })

    const data = await res.json()
    const reply: string = data.content?.[0]?.text ?? ''

    // Lead detection — check user message
    const emailMatch = message.match(EMAIL_RE)
    const phoneMatch = message.match(PHONE_RE)
    if (emailMatch || phoneMatch) {
      await captureLead(message, emailMatch?.[0], phoneMatch?.[0])
    }

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: 'Désolé, une erreur est survenue.' })
  }
}
