import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Lightsofter, une agence web qui crée des sites professionnels pour les PME françaises et belges.

SERVICES ET TARIFS :
- Site vitrine professionnel : à partir de 490€, livré en 5 jours ouvrés
- Site e-commerce : à partir de 890€, livré en 7 jours
- Application web sur mesure (SaaS, tableau de bord) : à partir de 790€
- Application Android native : à partir de 990€
- Refonte de site existant : à partir de 390€
- Devis gratuit sous 24h pour tous les projets complexes

AVANTAGES LIGHTSOFTER :
- Livraison en 5 jours (engagement contractuel)
- Garantie satisfait ou remboursé
- Support inclus 30 jours après livraison
- Spécialistes PME France & Belgique

COMMANDES DE NAVIGATION — utilise exactement ces balises quand pertinent :
- Envoyer vers le formulaire de devis → [ACTION:scroll:devis]
- Montrer le portfolio / réalisations → [ACTION:scroll:realisations]
- Montrer les tarifs / offres → [ACTION:scroll:tarifs]
- Voir les témoignages clients → [ACTION:scroll:temoignages]
- Aller au blog → [ACTION:navigate:/blog]
- Page de contact → [ACTION:navigate:/contact]

RÈGLES STRICTES :
1. Réponses courtes — 2 à 3 phrases maximum par message
2. Réponds en français par défaut, en anglais si le visiteur écrit en anglais
3. Si quelqu'un montre un intérêt concret pour un projet → demande naturellement son prénom puis son email ou numéro de téléphone
4. Ne jamais donner de prix ferme pour projets complexes → propose devis gratuit
5. Toujours terminer par un appel à l'action clair (balise navigation OU question de qualification)
6. Emojis avec modération (1 max par message)

EXEMPLES DE RÉPONSES :
- "Combien coûte un site ?" → explique brièvement les fourchettes + [ACTION:scroll:tarifs]
- "Je veux un devis" → "Parfait, je vous emmène vers notre formulaire !" + [ACTION:scroll:devis]
- "Vous avez des exemples ?" → réponse courte + [ACTION:scroll:realisations]
- "Je cherche un développeur pour une appli" → qualifie le besoin, puis "Pour un devis précis, quel est votre prénom ?"
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
