/**
 * /api/crm/agent — AI agent that analyzes leads and auto-manages the CRM
 *
 * Actions performed:
 * - Analyzes all leads and prioritizes them
 * - Detects stale/forgotten leads
 * - Generates personalized WhatsApp message drafts
 * - Suggests status updates
 * - Sends a Telegram summary report
 */
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function auth(req: Request) {
  const password = process.env.CRM_PASSWORD
  if (!password) return true
  return req.headers.get('x-crm-password') === password
}

interface Lead {
  ID: string
  Date: string
  Source: string
  Nom: string
  Téléphone: string
  Business: string
  Ville: string
  Secteur: string
  Statut: string
  Notes: string
  WhatsApp: string
}

export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const scriptUrl  = process.env.GOOGLE_SCRIPT_URL
  const tgToken    = process.env.TELEGRAM_BOT_TOKEN
  const tgChat     = process.env.TELEGRAM_CHAT_ID
  const anthropicKey = process.env.ANTHROPIC_API_KEY

  if (!scriptUrl) return NextResponse.json({ error: 'GOOGLE_SCRIPT_URL not set' }, { status: 503 })
  if (!anthropicKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 503 })

  try {
    // 1. Fetch all leads from Google Sheets
    const leadsRes = await fetch(`${scriptUrl}?action=getLeads`, { cache: 'no-store' })
    const leadsData = await leadsRes.json()
    const leads: Lead[] = leadsData.data || []

    if (!leads.length) {
      return NextResponse.json({ ok: true, message: 'No leads to analyze', actions: [] })
    }

    // 2. Filter active leads (exclude Perdu/Client)
    const activeLeads = leads.filter(l => l.Statut !== 'Perdu' && l.Statut !== 'Archivé')
    const today = new Date()

    // 3. Calculate days since each lead
    const leadsWithAge = activeLeads.map(lead => {
      let days = 0
      try {
        const parts = lead.Date?.split(' ')[0]?.split('/')
        if (parts?.length === 3) {
          const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
          days = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
        }
      } catch (_) {}
      return { ...lead, daysAgo: days }
    })

    // 4. Ask Claude to analyze and act
    const client = new Anthropic({ apiKey: anthropicKey })

    const leadsJson = JSON.stringify(leadsWithAge.slice(0, 30), null, 2)

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2000,
      system: `You are a CRM sales agent for Lightsofter, a web agency that builds websites for SMBs and salons.
Your job is to analyze leads and return a JSON action plan.
Today is ${today.toLocaleDateString('fr-FR')}.

Return ONLY valid JSON with this exact structure:
{
  "summary": "2-3 sentence overview of the pipeline",
  "urgent": ["lead IDs that need immediate action"],
  "actions": [
    {
      "leadId": "LS-xxx",
      "leadName": "Name",
      "currentStatus": "Nouveau",
      "suggestedStatus": "Contacté",
      "priority": "high|medium|low",
      "reason": "Why this action",
      "waMessage": "Ready-to-send WhatsApp message in French, personalized for this lead",
      "autoUpdate": true
    }
  ],
  "stats": {
    "total": 0,
    "nouveau": 0,
    "contacte": 0,
    "devis": 0,
    "stale": 0
  }
}

Rules:
- "Nouveau" leads > 2h old: suggest moving to "Contacté" + write WA message
- "Contacté" leads > 3 days: flag as stale, write follow-up WA message
- "Devis envoyé" > 5 days no update: write closing WA message
- WA messages must be warm, professional, in French, use the lead's first name
- autoUpdate = true only for "Nouveau" → "Contacté" transitions
- Max 10 actions in the array`,
      messages: [{ role: 'user', content: `Analyze these leads and give me the action plan:\n${leadsJson}` }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    let analysis: {
      summary: string
      urgent: string[]
      actions: Array<{
        leadId: string
        leadName: string
        currentStatus: string
        suggestedStatus: string
        priority: string
        reason: string
        waMessage: string
        autoUpdate: boolean
      }>
      stats: Record<string, number>
    }

    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : raw)
    } catch (_) {
      return NextResponse.json({ ok: false, error: 'AI parse error', raw })
    }

    // 5. Auto-update statuses where flagged
    const autoUpdated: string[] = []
    if (scriptUrl) {
      for (const action of analysis.actions) {
        if (action.autoUpdate && action.suggestedStatus) {
          await fetch(scriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'updateLead',
              id: action.leadId,
              status: action.suggestedStatus,
            }),
          })
          autoUpdated.push(action.leadId)
        }
      }
    }

    // 6. Send Telegram report
    if (tgToken && tgChat) {
      const urgent = analysis.actions.filter(a => a.priority === 'high')
      const tgMsg = [
        `🤖 <b>Rapport Agent CRM — ${today.toLocaleDateString('fr-FR')}</b>`,
        ``,
        `📊 <b>Pipeline:</b> ${analysis.stats?.total || activeLeads.length} leads actifs`,
        ``,
        `💡 ${analysis.summary}`,
        ``,
        urgent.length > 0 ? `🚨 <b>${urgent.length} action(s) urgente(s) :</b>` : null,
        ...urgent.map(a => `• <b>${a.leadName}</b> — ${a.reason}`),
        autoUpdated.length > 0
          ? `\n✅ <b>${autoUpdated.length} statut(s) mis à jour automatiquement</b>`
          : null,
        ``,
        `👉 Voir le CRM complet sur lightsofter.vercel.app/crm`,
      ].filter(s => s !== null).join('\n')

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgChat, text: tgMsg, parse_mode: 'HTML' }),
      })
    }

    return NextResponse.json({
      ok: true,
      analysis,
      autoUpdated,
      leadsAnalyzed: activeLeads.length,
    })

  } catch (err) {
    console.error('Agent error:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
