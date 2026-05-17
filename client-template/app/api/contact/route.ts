import { NextRequest, NextResponse } from 'next/server'
import cfg from '../../../site-config.json'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  const token   = process.env.TELEGRAM_BOT_TOKEN
  const chatId  = process.env.TELEGRAM_CHAT_ID

  if (token && chatId) {
    const text = [
      `📩 <b>Nouveau message — ${cfg.business.name}</b>`,
      ``,
      `👤 ${name}`,
      `📧 ${email}`,
      ``,
      `💬 ${message}`,
    ].join('\n')

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  }

  return NextResponse.json({ ok: true })
}
