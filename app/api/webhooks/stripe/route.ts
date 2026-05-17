import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' })

const SUBSCRIPTION_PRICES: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_MAINT_BASIC ?? '',
  pro: process.env.STRIPE_PRICE_MAINT_PRO ?? '',
}

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

async function createSubscriptionLink(priceId: string, email: string, metadata: Record<string, string>) {
  if (!priceId) return null
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    locale: 'fr',
    customer_email: email || undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success?subscribed=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  })
  return session.url
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

    // Build subscription link if maintenance was chosen
    let subscriptionLine = ''
    if (m.maintenance && m.maintenance !== 'none') {
      const priceId = SUBSCRIPTION_PRICES[m.maintenance]
      const link = await createSubscriptionLink(priceId, m.email ?? '', {
        businessName: m.businessName,
        clientEmail: m.email ?? '',
        maintenance: m.maintenance,
      })
      const label = m.maintenance === 'pro' ? '49€/mois' : '29€/mois'
      subscriptionLine = link
        ? `\n\n📋 <b>Lien maintenance ${label} :</b>\n${link}\n(À envoyer au client après livraison)`
        : `\n\n⚠️ Maintenance choisie (${label}) — créer lien Stripe manuellement`
    }

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
      subscriptionLine,
    ].filter(Boolean).join('\n')

    await sendTelegram(msg)
  }

  return NextResponse.json({ received: true })
}
