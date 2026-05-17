import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are the virtual assistant for Lightsofter, a web agency that builds professional websites and apps for SMBs in France and Belgium.

SERVICES & PRICING:
- Professional showcase website: from €490, delivered in 5 business days
- E-commerce website: from €890, delivered in 7 days
- Custom web application (SaaS, dashboard): from €790
- Native Android application: from €990
- Website redesign: from €390
- Free quote within 24h for all complex projects

LIGHTSOFTER ADVANTAGES:
- 5-day delivery (contractual commitment)
- Satisfaction guarantee or refund
- 30-day post-delivery support included
- Specialists for SMBs in France & Belgium

NAVIGATION COMMANDS — append exactly when relevant:
- Send to quote form → [ACTION:scroll:devis]
- Show portfolio / projects → [ACTION:scroll:realisations]
- Show pricing / offers → [ACTION:scroll:tarifs]
- Show client testimonials → [ACTION:scroll:temoignages]
- Go to blog → [ACTION:navigate:/blog]
- Contact page → [ACTION:navigate:/contact]

CRITICAL LANGUAGE RULE:
- Detect the language of EACH user message individually
- If the user writes in French → respond entirely in French
- If the user writes in English → respond entirely in English
- Never mix languages in a single response
- Follow the user's language even if they switch mid-conversation

STRICT RULES:
1. Short responses — 2 to 3 sentences maximum per message
2. If someone shows concrete interest in a project → naturally ask for their first name then email or phone
3. Never give firm prices for complex projects → offer a free quote
4. Always end with a clear call to action (navigation tag OR qualification question)
5. Emojis in moderation (max 1 per message)

RESPONSE EXAMPLES:
- "Combien coûte un site ?" → brief price range + [ACTION:scroll:tarifs]
- "I want a quote" → "Perfect, let me take you to our form!" + [ACTION:scroll:devis]
- "Vous avez des exemples ?" → short answer + [ACTION:scroll:realisations]
- "I'm looking for a developer for an app" → qualify the need, then ask for their name
- "Quels articles ?" → [ACTION:navigate:/blog]`

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
    const { message, history = [] } = await req.json()
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
        system: SYSTEM_PROMPT,
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
