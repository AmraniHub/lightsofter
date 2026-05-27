import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const tgToken  = process.env.TELEGRAM_BOT_TOKEN
    const tgChat   = process.env.TELEGRAM_CHAT_ID
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    const projectLabel: Record<string, string> = {
      vitrine: 'Site vitrine', ecommerce: 'E-commerce', landing: 'Landing page',
      refonte: 'Refonte', booking: 'Site + réservation', other: 'Autre',
    }

    // ── Telegram notification ─────────────────────────────────────────────────
    if (tgToken && tgChat) {
      const waRaw = (body.phone || '').replace(/\D/g, '').replace(/^0/, '')
      const msg = [
        `📋 <b>BRIEF REÇU — ${body.company}</b>`,
        ``,
        `👤 <b>${body.ownerName}</b> · ${body.city || '—'}`,
        `📞 ${body.phone}`,
        `📧 ${body.email}`,
        `💼 Secteur: ${body.sector || '—'}`,
        ``,
        `🖥 Projet: ${projectLabel[body.projectType] || body.projectType || '—'}`,
        body.budget   ? `💶 Budget: ${body.budget}`   : null,
        body.deadline ? `⏱ Délai: ${body.deadline}` : null,
        ``,
        `🎨 Palette: ${body.palette || '—'}`,
        body.style ? `🖌 Style: ${body.style}` : null,
        `🖼 Logo: ${body.hasLogo || '—'}`,
        `📸 Photos: ${body.hasPhotos || '—'}`,
        body.extraNote ? `💬 Note: ${body.extraNote}` : null,
        ``,
        waRaw
          ? `💬 <a href="https://wa.me/33${waRaw}">Ouvrir WhatsApp →</a>`
          : null,
      ].filter(Boolean).join('\n')

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChat, text: msg, parse_mode: 'HTML' }),
      })
    }

    // ── Google Sheets ─────────────────────────────────────────────────────────
    if (scriptUrl) {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action:      'addClientIntake',
          source:      'Lightsofter',
          ownerName:   body.ownerName || '—',
          company:     body.company || '—',
          sector:      body.sector || '—',
          city:        body.city || '—',
          phone:       body.phone || '—',
          email:       body.email || '—',
          existingUrl: body.existingUrl || '—',
          projectType: projectLabel[body.projectType] || body.projectType || '—',
          projectDesc: body.projectDesc || '—',
          budget:      body.budget || '—',
          deadline:    body.deadline || '—',
          palette:     body.palette || '—',
          style:       body.style || '—',
          hasLogo:     body.hasLogo || '—',
          hasPhotos:   body.hasPhotos || '—',
          services:    body.services || '[]',
          aboutText:   body.aboutText || '—',
          domain:      body.domain || '—',
          instagram:   body.instagram || '—',
          facebook:    body.facebook || '—',
          linkedin:    body.linkedin || '—',
          googleMaps:  body.googleMaps || '—',
          extraNote:   body.extraNote || '—',
          submittedAt: body.submittedAt || new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Intake error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
