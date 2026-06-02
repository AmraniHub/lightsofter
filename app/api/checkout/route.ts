import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    const tgToken   = process.env.TELEGRAM_BOT_TOKEN
    const tgChat    = process.env.TELEGRAM_CHAT_ID

    const total = body.package === 'pro' ? 790 : 490
    const paymentLabels: Record<string, string> = {
      payoneer: 'Payoneer',
      paypal:   'PayPal',
      iban:     'Virement bancaire (IBAN)',
    }

    // ── Save to Google Sheets as a lead ──────────────────────────────────────
    if (scriptUrl) {
      const waRaw = (body.phone || '').replace(/\D/g, '').replace(/^0/, '')
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action:   'addLead',
          source:   'Lightsofter',
          name:     `${body.firstName} ${body.lastName}`.trim(),
          phone:    body.phone || '—',
          business: body.businessName || '—',
          city:     body.country || '—',
          sector:   body.sector || '—',
          status:   'Devis envoyé',
          notes:    [
            `Formule: ${body.package} (${total}€)`,
            body.maintenance !== 'none' ? `Maintenance: ${body.maintenance}` : null,
            `Paiement: ${paymentLabels[body.paymentMethod] || body.paymentMethod}`,
            body.tagline    ? `Tagline: ${body.tagline}`   : null,
            body.services   ? `Services: ${body.services}` : null,
            body.notes      ? `Notes: ${body.notes}`       : null,
          ].filter(Boolean).join(' | '),
        }),
      })

      // Auto-create project
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action:    'addProject',
          client:    `${body.firstName} ${body.lastName}`.trim(),
          business:  body.businessName || '—',
          type:      body.package === 'pro' ? 'Site Pro' : 'Site vitrine',
          status:    'Brief',
          price:     total,
          startDate: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
          dueDate:   '—',
          url:       '—',
          notes:     `Paiement: ${paymentLabels[body.paymentMethod] || '—'} | Style: ${body.style || '—'}`,
        }),
      })
    }

    // ── Telegram alert ────────────────────────────────────────────────────────
    if (tgToken && tgChat) {
      const waRaw = (body.phone || '').replace(/\D/g, '').replace(/^0/, '')
      const msg = [
        `💳 <b>NOUVELLE COMMANDE — ${body.businessName || body.firstName}</b>`,
        ``,
        `👤 ${body.firstName} ${body.lastName} · ${body.country}`,
        `📞 ${body.phone}`,
        `📧 ${body.email}`,
        ``,
        `📦 Formule: <b>${body.package === 'pro' ? 'Pro 790€' : 'Essentiel 490€'}</b>`,
        `💳 Paiement choisi: <b>${paymentLabels[body.paymentMethod] || body.paymentMethod}</b>`,
        body.maintenance !== 'none' ? `🔧 Maintenance: ${body.maintenance}` : null,
        ``,
        `🏢 ${body.businessName} — ${body.sector}`,
        ``,
        waRaw ? `💬 <a href="https://wa.me/33${waRaw}">Ouvrir WhatsApp →</a>` : null,
      ].filter(Boolean).join('\n')

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChat, text: msg, parse_mode: 'HTML' }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
