import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' })

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const secret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const m = session.metadata ?? {}
    const amount = ((session.amount_total ?? 0) / 100).toFixed(0)

    const msg = [
      `💰 <b>NOUVELLE COMMANDE — ${amount}€</b>`,
      ``,
      `👤 <b>${m.firstName} ${m.lastName}</b>`,
      `📧 ${m.email}`,
      `📞 ${m.phone} · ${m.country}`,
      ``,
      `🏢 <b>${m.businessName}</b> (${m.sector})`,
      `💬 "${m.tagline}"`,
      ``,
      `📦 Formule : ${m.package === 'pro' ? 'Pro 790€' : 'Essentiel 490€'}`,
      `🔧 Maintenance : ${m.maintenance === 'none' ? 'Non' : m.maintenance === 'pro' ? 'Pro 49€/mois' : '29€/mois'}`,
      `🎨 Style : ${m.style} · Couleurs : ${m.colors || 'non précisé'}`,
      ``,
      `🛎️ Services : ${m.services}`,
      m.about ? `ℹ️ À propos : ${m.about}` : '',
      m.examples ? `🔗 Inspiration : ${m.examples}` : '',
      m.notes ? `📝 Notes : ${m.notes}` : '',
      ``,
      `✅ Paiement confirmé · Session: ${session.id}`,
    ].filter(Boolean).join('\n')

    await sendTelegram(msg)
  }

  return NextResponse.json({ received: true })
}
