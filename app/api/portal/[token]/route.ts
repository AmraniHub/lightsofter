import { NextResponse } from 'next/server'

const SCRIPT_URL = () => process.env.GOOGLE_SCRIPT_URL || ''

export async function GET(
  _req: Request,
  { params }: { params: { token: string } }
) {
  const url = SCRIPT_URL()
  if (!url) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  const res  = await fetch(`${url}?action=getProjects`, { cache: 'no-store' })
  const data = await res.json()

  const project = (data.data || []).find(
    (p: Record<string, string>) => p.ID === params.token
  )

  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

  return NextResponse.json({ ok: true, project })
}
