import { NextResponse } from 'next/server'
import { google } from 'googleapis'

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
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!email || !key || !sheetId) return

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  const date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Leads!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        date,
        data.name,
        data.email,
        data.phone || '—',
        data.type || '—',
        data.budget || '—',
        data.deadline || '—',
        data.goal || '—',
        data.message || '—',
        data.locale.toUpperCase(),
      ]],
    },
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
