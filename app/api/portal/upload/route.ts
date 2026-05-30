import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file     = formData.get('file') as File | null
    const projectId = formData.get('projectId') as string
    const clientName = formData.get('clientName') as string
    const message   = formData.get('message') as string

    const tgToken = process.env.TELEGRAM_BOT_TOKEN
    const tgChat  = process.env.TELEGRAM_CHAT_ID

    if (!tgToken || !tgChat) {
      return NextResponse.json({ ok: false, error: 'Telegram not configured' })
    }

    // ── Send text message / note ──────────────────────────────────────────────
    if (message && !file) {
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChat,
          text: `💬 <b>Message client — ${clientName}</b>\n🔖 Projet: ${projectId}\n\n${message}`,
          parse_mode: 'HTML',
        }),
      })
      return NextResponse.json({ ok: true })
    }

    // ── Send file via Telegram ────────────────────────────────────────────────
    if (file) {
      const bytes  = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Telegram limit: 50MB for bots, but we cap at 10MB to be safe
      if (buffer.byteLength > 10 * 1024 * 1024) {
        return NextResponse.json({ ok: false, error: 'Fichier trop volumineux (max 10 MB)' })
      }

      const tgForm = new FormData()
      tgForm.append('chat_id', tgChat)
      tgForm.append('caption', `📎 <b>Fichier reçu — ${clientName}</b>\n🔖 Projet: ${projectId}\n📄 ${file.name}`)
      tgForm.append('parse_mode', 'HTML')
      tgForm.append('document', new Blob([buffer], { type: file.type }), file.name)

      await fetch(`https://api.telegram.org/bot${tgToken}/sendDocument`, {
        method: 'POST',
        body: tgForm,
      })

      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false, error: 'No file or message provided' })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
