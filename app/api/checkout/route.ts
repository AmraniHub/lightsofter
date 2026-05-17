import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' })

const PRICES: Record<string, number> = { essentiel: 49000, pro: 79000 }

export async function POST(req: NextRequest) {
  try {
    const form = await req.json()
    const amount = PRICES[form.package] ?? 49000
    const pkgName = form.package === 'pro' ? 'Pro' : 'Essentiel'
    const maintLabel = form.maintenance !== 'none'
      ? ` + Maintenance ${form.maintenance === 'pro' ? 'Pro 49€/mois' : '29€/mois'}`
      : ''

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'fr',
      customer_email: form.email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: amount,
            product_data: {
              name: `Lightsofter — Formule ${pkgName}${maintLabel}`,
              description: `Site pour ${form.businessName || 'votre entreprise'} · Livraison 2-3 jours`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        package: form.package,
        maintenance: form.maintenance,
        businessName: form.businessName,
        sector: form.sector,
        tagline: (form.tagline || '').slice(0, 200),
        services: (form.services || '').slice(0, 400),
        about: (form.about || '').slice(0, 400),
        colors: form.colors,
        style: form.style,
        examples: (form.examples || '').slice(0, 200),
        notes: (form.notes || '').slice(0, 200),
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        country: form.country,
        email: form.email,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
