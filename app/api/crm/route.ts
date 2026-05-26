/**
 * /api/crm — proxy to Google Apps Script
 * Auth: X-CRM-Password header must match CRM_PASSWORD env var
 */
import { NextResponse } from 'next/server'

function auth(req: Request) {
  const password = process.env.CRM_PASSWORD
  if (!password) return true // no password set = open (dev mode)
  return req.headers.get('x-crm-password') === password
}

const SCRIPT_URL = () => process.env.GOOGLE_SCRIPT_URL || ''

// ── GET — fetch leads or projects ─────────────────────────────────────────────
export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'leads' // leads | projects

  const action = type === 'projects' ? 'getProjects' : 'getLeads'
  const url = SCRIPT_URL()
  if (!url) return NextResponse.json({ ok: false, error: 'GOOGLE_SCRIPT_URL not set' }, { status: 503 })

  const res  = await fetch(`${url}?action=${action}`, { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

// ── POST — update lead/project, add project ──────────────────────────────────
export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const url  = SCRIPT_URL()
  if (!url) return NextResponse.json({ ok: false, error: 'GOOGLE_SCRIPT_URL not set' }, { status: 503 })

  const res  = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data)
}
