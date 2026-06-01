import { NextResponse } from 'next/server'

interface SubmitBody {
  name: string
  email: string
  phone: string
  message: string
  type: string
  budget: string
  deadline: string
  goal: string
  locale: string
}

async function appendToSheet(data: SubmitBody) {
  const url = process.env.GOOGLE_SCRIPT_URL
  if (!url) return

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action:   'addLead',
      source:   'Lightsofter',
      name:     data.name,
      phone:    data.phone || '—',
      business: data.email || '—',   // email stored in business field (no email column in Leads sheet)
      city:     data.locale === 'en' ? 'Belgique/Suisse/Monaco/International' : 'France/Suisse/Monaco',
      sector:   data.type || '—',
      notes:    [
        data.goal   ? `Objectif: ${data.goal}` : null,
        data.budget ? `Budget: ${data.budget}` : null,
        data.deadline ? `Délai: ${data.deadline}` : null,
        data.message ? `Message: ${data.message}` : null,
      ].filter(Boolean).join(' | ') || '—',
    }),
  })
}

async function sendTelegram(data: SubmitBody) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return

  const text = [
    `🚀 <b>Nouveau lead Lightsofter</b>`,
    ``,
    `👤 <b>Nom :</b> ${data.name}`,
    `📧 <b>Email :</b> ${data.email}`,
    `📱 <b>Téléphone :</b> ${data.phone || '—'}`,
    ``,
    `🖥 <b>Projet :</b> ${data.type || '—'}`,
    `💶 <b>Budget :</b> ${data.budget || '—'}`,
    `⏱ <b>Délai :</b> ${data.deadline || '—'}`,
    `🎯 <b>Objectif :</b> ${data.goal || '—'}`,
    ``,
    data.message ? `💬 <b>Message :</b> ${data.message}` : null,
    `🌐 <b>Langue :</b> ${data.locale.toUpperCase()}`,
  ].filter(Boolean).join('\n')

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: Request) {
  try {
    const body: SubmitBody = await req.json()

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await Promise.allSettled([
      appendToSheet(body),
      sendTelegram(body),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
