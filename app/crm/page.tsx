'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Lead {
  ID: string; Date: string; Source: string; Nom: string
  Téléphone: string; Business: string; Ville: string
  Secteur: string; Statut: string; Notes: string; WhatsApp: string
}
interface Project {
  ID: string; Date: string; Client: string; Business: string
  Type: string; Statut: string; 'Prix (€)': string
  Début: string; Livraison: string; URL: string; Notes: string
}

const LEAD_STATUSES    = ['Nouveau','Contacté','Devis envoyé','Client','Perdu']
const PROJECT_STATUSES = ['Brief','En cours','Révision','Livré','Maintenance','Archivé']
const PROJECT_TYPES    = ['Site vitrine','E-commerce','Application Android','Application Web','SEO','Autre']

const STATUS_STYLE: Record<string, string> = {
  Nouveau:        'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  Contacté:       'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  'Devis envoyé': 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  Client:         'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  Perdu:          'bg-red-500/15 text-red-400 border border-red-500/20',
  Brief:          'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  'En cours':     'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  Révision:       'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  Livré:          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  Maintenance:    'bg-teal-500/15 text-teal-400 border border-teal-500/20',
  Archivé:        'bg-gray-500/15 text-gray-500 border border-gray-500/20',
}
const SOURCE_STYLE: Record<string, string> = {
  MonSalonVip: 'bg-pink-500/15 text-pink-400',
  Lightsofter: 'bg-indigo-500/15 text-indigo-400',
  AmraniAds:   'bg-orange-500/15 text-orange-400',
  'Meta Ads':  'bg-blue-500/15 text-blue-400',
  Organic:     'bg-green-500/15 text-green-400',
  Referral:    'bg-yellow-500/15 text-yellow-400',
}

function daysAgo(dateStr: string): number {
  try {
    const p = dateStr?.split(' ')[0]?.split('/')
    if (!p || p.length < 3) return 0
    const d = new Date(`${p[2]}-${p[1]}-${p[0]}`)
    return Math.floor((Date.now() - d.getTime()) / 86400000)
  } catch { return 0 }
}

function urgencyDot(lead: Lead) {
  if (lead.Statut === 'Perdu' || lead.Statut === 'Client') return null
  const d = daysAgo(lead.Date)
  if (lead.Statut === 'Nouveau' && d >= 1) return 'bg-red-500'
  if (lead.Statut === 'Contacté' && d >= 3) return 'bg-amber-500'
  if (lead.Statut === 'Devis envoyé' && d >= 5) return 'bg-orange-500'
  return null
}

// ── INPUT / SELECT shared styles ──────────────────────────────────────────────
const INP = 'w-full bg-[#111116] border border-[#1e1e2a] text-white placeholder-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition'

// ── Auth ──────────────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }: { onAuth: (p: string) => void }) {
  const [pw, setPw] = useState(''); const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const res = await fetch('/api/crm?type=leads', { headers: { 'x-crm-password': pw } })
    setLoading(false)
    if (res.status !== 401) { sessionStorage.setItem('crm_pw', pw); onAuth(pw) }
    else setErr(true)
  }
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 shadow-lg shadow-violet-900/40">L</div>
          <h1 className="text-2xl font-black text-white">Lightsofter CRM</h1>
          <p className="text-gray-500 text-sm mt-1">Accès réservé</p>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input type="password" required placeholder="Mot de passe" value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            className={INP + ' py-3 text-center tracking-widest'}
          />
          {err && <p className="text-red-400 text-xs text-center">Mot de passe incorrect</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-violet-900/30">
            {loading ? '...' : 'Accéder →'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Add Project Modal ─────────────────────────────────────────────────────────
function AddProjectModal({ pw, onClose, onAdded }: { pw: string; onClose: () => void; onAdded: () => void }) {
  const [form, setForm] = useState({ client: '', business: '', type: 'Site vitrine', price: '490', dueDate: '', url: '', notes: '' })
  const [loading, setLoading] = useState(false)
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await fetch('/api/crm', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-crm-password': pw }, body: JSON.stringify({ action: 'addProject', ...form }) })
    setLoading(false); onAdded(); onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-[#111116] border border-[#1e1e2a] rounded-2xl p-7 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white">Nouveau projet</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-white text-xl transition">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {[
            { label: 'Client *', key: 'client', type: 'text', ph: 'Marie Dupont' },
            { label: 'Business *', key: 'business', type: 'text', ph: 'Salon Éléonore' },
            { label: 'Prix (€)', key: 'price', type: 'number', ph: '490' },
            { label: 'Livraison prévue', key: 'dueDate', type: 'date', ph: '' },
            { label: 'URL (après livraison)', key: 'url', type: 'url', ph: 'https://...' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
              <input type={f.type} placeholder={f.ph} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className={INP} />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={INP + ' cursor-pointer'}>
              {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} className={INP + ' resize-none'} />
          </div>
          <button type="submit" disabled={loading || !form.client || !form.business}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition mt-2">
            {loading ? 'Création...' : '+ Créer le projet'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Lead Drawer ───────────────────────────────────────────────────────────────
function LeadDrawer({ lead, pw, onClose, onSaved }: { lead: Lead; pw: string; onClose: () => void; onSaved: (id: string, notes: string) => void }) {
  const [notes, setNotes] = useState(lead.Notes || '')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<'wa'|'link'|null>(null)

  const waMsg = `Bonjour ${lead.Nom} 👋\n\nJ'ai bien reçu votre demande${lead.Business && lead.Business !== '—' ? ` pour ${lead.Business}` : ''} — merci !\n\nJe suis de ${lead.Source === 'MonSalonVip' ? 'MonSalonVip' : 'Lightsofter'}.\n\nPour préparer votre site, j'ai besoin de quelques infos :\n👉 https://${lead.Source === 'MonSalonVip' ? 'monsalonvip.vercel.app' : 'lightsofter.vercel.app'}/intake\n\nÀ tout de suite ! 🚀`

  function copy(type: 'wa'|'link', text: string) {
    navigator.clipboard.writeText(text); setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  async function save() {
    setSaving(true)
    await fetch('/api/crm', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-crm-password': pw }, body: JSON.stringify({ action: 'updateLead', id: lead.ID, notes }) })
    setSaving(false); onSaved(lead.ID, notes); onClose()
  }

  const dot = urgencyDot(lead)

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
      <div className="bg-[#0f0f15] border-l border-[#1e1e2a] w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-[#1e1e2a]">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {dot && <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />}
                <h3 className="text-white font-black text-xl">{lead.Nom}</h3>
              </div>
              <p className="text-gray-500 text-sm">{lead.Business !== '—' ? lead.Business : ''}{lead.Ville ? ` · ${lead.Ville}` : ''}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SOURCE_STYLE[lead.Source] || 'bg-gray-700 text-gray-400'}`}>{lead.Source}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[lead.Statut] || ''}`}>{lead.Statut}</span>
                <span className="text-gray-600 text-xs">{daysAgo(lead.Date)}j</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-white text-xl transition mt-1">✕</button>
          </div>
        </div>

        <div className="p-6 flex-1 space-y-5">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            {lead.WhatsApp && lead.WhatsApp !== '—' && (
              <a href={lead.WhatsApp} target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-sm transition col-span-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Ouvrir WhatsApp
              </a>
            )}
          </div>

          {/* WA Template */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Message 1er contact</p>
              <button onClick={() => copy('wa', waMsg)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition ${copied === 'wa' ? 'bg-emerald-600 text-white' : 'bg-[#1e1e2a] hover:bg-[#2a2a38] text-gray-400'}`}>
                {copied === 'wa' ? '✓ Copié' : '📋 Copier'}
              </button>
            </div>
            <div className="bg-[#111116] border border-[#1e1e2a] rounded-xl px-4 py-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
              {waMsg}
            </div>
          </div>

          {/* Lead info */}
          <div className="bg-[#111116] border border-[#1e1e2a] rounded-xl p-4 space-y-2">
            {[
              ['ID', lead.ID],
              ['Date', lead.Date?.split(' ')[0]],
              ['Secteur', lead.Secteur],
              ['Téléphone', lead.Téléphone],
            ].filter(([,v]) => v && v !== '—').map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 w-20 shrink-0">{k}</span>
                <span className="text-gray-300">{v}</span>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Notes internes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
              placeholder="Besoins spécifiques, résumé des échanges, infos clés..."
              className={INP + ' resize-none'}
            />
          </div>

          {/* Intake link */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Lien formulaire intake</p>
              <button onClick={() => copy('link', `https://${lead.Source === 'MonSalonVip' ? 'monsalonvip.vercel.app' : 'lightsofter.vercel.app'}/intake`)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition ${copied === 'link' ? 'bg-emerald-600 text-white' : 'bg-[#1e1e2a] hover:bg-[#2a2a38] text-gray-400'}`}>
                {copied === 'link' ? '✓ Copié' : '🔗 Copier'}
              </button>
            </div>
            <p className="text-indigo-400 text-xs">{`https://${lead.Source === 'MonSalonVip' ? 'monsalonvip.vercel.app' : 'lightsofter.vercel.app'}/intake`}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1e1e2a]">
          <button onClick={save} disabled={saving}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition">
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder les notes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── CSV Export ────────────────────────────────────────────────────────────────
function exportCSV(leads: Lead[]) {
  const headers = ['ID','Date','Source','Nom','Téléphone','Business','Ville','Secteur','Statut','Notes']
  const rows = leads.map(l => headers.map(h => `"${(l[h as keyof Lead]||'').toString().replace(/"/g,'""')}"`).join(','))
  const blob = new Blob(['﻿' + [headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' })
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `leads-${new Date().toISOString().split('T')[0]}.csv` })
  a.click(); URL.revokeObjectURL(a.href)
}

// ── Kanban Column ─────────────────────────────────────────────────────────────
function KanbanColumn({ status, leads, onSelect }: { status: string; leads: Lead[]; onSelect: (l: Lead) => void }) {
  const style = STATUS_STYLE[status] || 'bg-gray-700 text-gray-300'
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style}`}>{status}</span>
        <span className="text-gray-600 text-xs font-semibold">{leads.length}</span>
      </div>
      <div className="space-y-2">
        {leads.map(lead => {
          const dot = urgencyDot(lead)
          return (
            <div key={lead.ID} onClick={() => onSelect(lead)}
              className="bg-[#111116] border border-[#1e1e2a] hover:border-violet-500/40 rounded-xl p-3 cursor-pointer transition-all group">
              <div className="flex items-center gap-1.5 mb-1">
                {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />}
                <p className="text-white text-xs font-bold truncate group-hover:text-violet-300 transition">{lead.Nom}</p>
              </div>
              {lead.Business !== '—' && <p className="text-gray-500 text-xs truncate">{lead.Business}</p>}
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${SOURCE_STYLE[lead.Source] || 'bg-gray-700 text-gray-500'}`}>{lead.Source}</span>
                <span className="text-gray-700 text-xs">{daysAgo(lead.Date)}j</span>
              </div>
            </div>
          )
        })}
        {leads.length === 0 && <div className="border border-dashed border-[#1e1e2a] rounded-xl p-4 text-center text-gray-700 text-xs">Vide</div>}
      </div>
    </div>
  )
}

// ── Agent Panel ───────────────────────────────────────────────────────────────
function AgentPanel({ result, onClose }: { result: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f15] border border-violet-800/30 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-lg">🤖</div>
            <div>
              <h3 className="text-white font-black">Agent IA</h3>
              <p className="text-gray-600 text-xs">{result.leadsAnalyzed} leads analysés</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white text-xl transition">✕</button>
        </div>

        <div className="bg-violet-950/20 border border-violet-800/20 rounded-xl p-4 mb-5">
          <p className="text-violet-300 text-sm leading-relaxed">💡 {result.analysis?.summary}</p>
        </div>

        {result.autoUpdated?.length > 0 && (
          <div className="bg-emerald-950/20 border border-emerald-800/20 rounded-xl px-4 py-3 mb-5">
            <p className="text-emerald-400 text-sm font-semibold">✅ {result.autoUpdated.length} statut(s) mis à jour</p>
          </div>
        )}

        <div className="space-y-3">
          {result.analysis?.actions?.map((action: any, i: number) => (
            <AgentCard key={i} action={action} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AgentCard({ action }: { action: any }) {
  const [copied, setCopied] = useState(false)
  function copy() { navigator.clipboard.writeText(action.waMessage); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const border = action.priority === 'high' ? 'border-red-800/30 bg-red-950/10' : action.priority === 'medium' ? 'border-amber-800/30 bg-amber-950/10' : 'border-[#1e1e2a] bg-[#111116]'
  const badge  = action.priority === 'high' ? 'bg-red-500/15 text-red-400' : action.priority === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-700 text-gray-400'
  return (
    <div className={`border rounded-xl p-4 space-y-3 ${border}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">{action.leadName}</span>
          {action.autoUpdate && <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">✓ Auto-update</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge}`}>
            {action.priority === 'high' ? '🚨 Urgent' : action.priority === 'medium' ? '⚠️ Moyen' : '• Bas'}
          </span>
          {action.suggestedStatus && <span className="text-xs text-gray-500">→ <span className="text-white">{action.suggestedStatus}</span></span>}
        </div>
      </div>
      <p className="text-gray-500 text-xs">{action.reason}</p>
      <div className="bg-[#0a0a0f] rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">WhatsApp</p>
          <button onClick={copy} className={`text-xs px-3 py-1 rounded-lg font-medium transition ${copied ? 'bg-emerald-600 text-white' : 'bg-[#1e1e2a] hover:bg-[#2a2a38] text-gray-400'}`}>
            {copied ? '✓ Copié' : '📋 Copier'}
          </button>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{action.waMessage}</p>
      </div>
    </div>
  )
}

function PortalBtn({ projectId }: { projectId: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://lightsofter.vercel.app'}/portal/${projectId}`
  function copy() { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${copied ? 'bg-emerald-600 text-white' : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20'}`}>
      {copied ? '✓' : '🔗'}
    </button>
  )
}

// ── Main CRM ──────────────────────────────────────────────────────────────────
export default function CRMPage() {
  const [pw, setPw] = useState<string | null>(null)
  const [tab, setTab] = useState<'leads' | 'projects'>('leads')
  const [view, setView] = useState<'table' | 'kanban'>('table')
  const [leads, setLeads] = useState<Lead[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState('Tous')
  const [filterSource, setFilterSource] = useState('Tous')
  const [search, setSearch] = useState('')
  const [showAddProject, setShowAddProject] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [agentLoading, setAgentLoading] = useState(false)
  const [agentResult, setAgentResult] = useState<any>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { const s = sessionStorage.getItem('crm_pw'); if (s) setPw(s) }, [])

  const fetchData = useCallback(async (type: 'leads' | 'projects', password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/crm?type=${type}`, { headers: { 'x-crm-password': password } })
      const json = await res.json()
      if (type === 'leads') setLeads((json.data || []).reverse())
      else setProjects((json.data || []).reverse())
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { if (pw) fetchData(tab, pw) }, [pw, tab, fetchData])

  async function updateLeadStatus(id: string, status: string) {
    if (!pw) return; setUpdatingId(id)
    await fetch('/api/crm', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-crm-password': pw }, body: JSON.stringify({ action: 'updateLead', id, status }) })
    setLeads(p => p.map(l => l.ID === id ? { ...l, Statut: status } : l)); setUpdatingId(null)
  }

  async function updateProjectStatus(id: string, status: string) {
    if (!pw) return; setUpdatingId(id)
    await fetch('/api/crm', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-crm-password': pw }, body: JSON.stringify({ action: 'updateProject', id, status }) })
    setProjects(p => p.map(pr => pr.ID === id ? { ...pr, Statut: status } : pr)); setUpdatingId(null)
  }

  async function runAgent() {
    if (!pw) return; setAgentLoading(true)
    try {
      const res = await fetch('/api/crm/agent', { method: 'POST', headers: { 'x-crm-password': pw } })
      const data = await res.json()
      if (data.ok) { setAgentResult(data); if (data.autoUpdated?.length > 0) fetchData('leads', pw) }
    } finally { setAgentLoading(false) }
  }

  if (!pw) return <AuthScreen onAuth={p => setPw(p)} />

  // Filters
  const filteredLeads = leads.filter(l => {
    const mS = filterStatus === 'Tous' || l.Statut === filterStatus
    const mSrc = filterSource === 'Tous' || l.Source === filterSource
    const mQ = !search || [l.Nom, l.Business, l.Ville, l.Téléphone, l.Secteur].join(' ').toLowerCase().includes(search.toLowerCase())
    return mS && mSrc && mQ
  })
  const filteredProjects = projects.filter(p => {
    const mS = filterStatus === 'Tous' || p.Statut === filterStatus
    const mQ = !search || [p.Client, p.Business, p.Type].join(' ').toLowerCase().includes(search.toLowerCase())
    return mS && mQ
  })

  // Stats
  const urgentCount = leads.filter(l => urgencyDot(l) === 'bg-red-500').length
  const stats = {
    total:      leads.length,
    nouveau:    leads.filter(l => l.Statut === 'Nouveau').length,
    clients:    leads.filter(l => l.Statut === 'Client').length,
    urgent:     urgentCount,
    revenue:    projects.filter(p => p.Statut !== 'Archivé').reduce((s, p) => s + (parseFloat(p['Prix (€)'])||0), 0),
    inProgress: projects.filter(p => ['En cours','Brief','Révision'].includes(p.Statut)).length,
  }

  // Kanban groups
  const kanbanGroups = LEAD_STATUSES.reduce((acc, s) => {
    acc[s] = filteredLeads.filter(l => l.Statut === s)
    return acc
  }, {} as Record<string, Lead[]>)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#0a0a0f]/90 backdrop-blur border-b border-[#1e1e2a] px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-black shadow-lg shadow-violet-900/30">L</div>
            <div className="hidden sm:block">
              <p className="text-white font-black text-sm leading-none">CRM</p>
              <p className="text-gray-600 text-xs">Lightsofter</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">🔍</span>
            <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher lead, business, ville..."
              className="w-full bg-[#111116] border border-[#1e1e2a] text-white placeholder-gray-600 rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500 transition"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">✕</button>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {urgentCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {urgentCount} urgent{urgentCount > 1 ? 's' : ''}
              </div>
            )}
            <button onClick={runAgent} disabled={agentLoading}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold text-xs px-3 py-2 rounded-xl transition shadow-lg shadow-violet-900/30">
              {agentLoading ? '⏳' : '🤖'} <span className="hidden sm:inline">{agentLoading ? 'Analyse...' : 'Agent IA'}</span>
            </button>
            <button onClick={() => fetchData(tab, pw!)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#1e1e2a] rounded-xl transition text-sm">↻</button>
            <button onClick={() => { sessionStorage.removeItem('crm_pw'); setPw(null) }} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-[#1e1e2a] rounded-xl transition text-xs">✕</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">

        {/* ── STATS ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { label: 'Leads', value: stats.total, icon: '👥', color: 'text-white' },
            { label: 'Nouveaux', value: stats.nouveau, icon: '🔵', color: 'text-blue-400' },
            { label: 'Urgents', value: stats.urgent, icon: '🚨', color: 'text-red-400' },
            { label: 'Clients', value: stats.clients, icon: '✅', color: 'text-emerald-400' },
            { label: 'En cours', value: stats.inProgress, icon: '⚡', color: 'text-orange-400' },
            { label: 'CA actif', value: `${stats.revenue.toLocaleString('fr-FR')}€`, icon: '💶', color: 'text-violet-400' },
          ].map(s => (
            <div key={s.label} className="bg-[#111116] border border-[#1e1e2a] rounded-2xl p-4">
              <p className="text-gray-600 text-xs mb-1">{s.icon} {s.label}</p>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── TABS + CONTROLS ───────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex bg-[#111116] border border-[#1e1e2a] rounded-xl p-1">
              {(['leads','projects'] as const).map(t => (
                <button key={t} onClick={() => { setTab(t); setFilterStatus('Tous'); setSearch('') }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${tab === t ? 'bg-violet-600 text-white shadow' : 'text-gray-500 hover:text-white'}`}>
                  {t === 'leads' ? `Leads ${leads.length > 0 ? `(${leads.length})` : ''}` : `Projets ${projects.length > 0 ? `(${projects.length})` : ''}`}
                </button>
              ))}
            </div>
            {tab === 'leads' && (
              <div className="flex bg-[#111116] border border-[#1e1e2a] rounded-xl p-1">
                {(['table','kanban'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${view === v ? 'bg-[#1e1e2a] text-white' : 'text-gray-600 hover:text-white'}`}>
                    {v === 'table' ? '☰ Table' : '⊞ Kanban'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="bg-[#111116] border border-[#1e1e2a] text-gray-400 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-violet-500 transition cursor-pointer">
              <option>Tous</option>
              {(tab === 'leads' ? LEAD_STATUSES : PROJECT_STATUSES).map(s => <option key={s}>{s}</option>)}
            </select>
            {tab === 'leads' && (
              <select value={filterSource} onChange={e => setFilterSource(e.target.value)}
                className="bg-[#111116] border border-[#1e1e2a] text-gray-400 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-violet-500 transition cursor-pointer">
                <option>Tous</option>
                {['MonSalonVip','Lightsofter','AmraniAds','Meta Ads','Organic','Referral'].map(s => <option key={s}>{s}</option>)}
              </select>
            )}
            {tab === 'leads' && (
              <button onClick={() => exportCSV(filteredLeads)}
                className="border border-[#1e1e2a] text-gray-500 hover:text-white hover:border-[#2a2a38] px-3 py-2 rounded-xl text-xs transition">
                ↓ CSV
              </button>
            )}
            {tab === 'projects' && (
              <button onClick={() => setShowAddProject(true)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                + Projet
              </button>
            )}
          </div>
        </div>

        {/* ── LOADING ───────────────────────────────────────────────── */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-600">
            <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Chargement...</span>
          </div>
        )}

        {/* ── LEADS TABLE ───────────────────────────────────────────── */}
        {!loading && tab === 'leads' && view === 'table' && (
          <div className="bg-[#111116] border border-[#1e1e2a] rounded-2xl overflow-hidden">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-600">
                <p className="text-3xl mb-3">📭</p><p className="text-sm">Aucun lead trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2a]">
                      {['','Date','Source','Nom & Business','Téléphone','Notes','Statut','Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(lead => {
                      const dot = urgencyDot(lead)
                      return (
                        <tr key={lead.ID} className="border-b border-[#1e1e2a]/50 hover:bg-white/[0.02] transition-colors group">
                          <td className="pl-4 py-3 w-4">
                            {dot && <span className={`w-2 h-2 rounded-full ${dot} block animate-pulse`} />}
                          </td>
                          <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{lead.Date?.split(' ')[0] || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SOURCE_STYLE[lead.Source] || 'bg-gray-700 text-gray-400'}`}>{lead.Source || '—'}</span>
                          </td>
                          <td className="px-4 py-3 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                            <p className="font-bold text-white group-hover:text-violet-300 transition text-sm">{lead.Nom || '—'}</p>
                            <p className="text-gray-600 text-xs">{lead.Business !== '—' ? lead.Business : ''}{lead.Ville ? ` · ${lead.Ville}` : ''}</p>
                          </td>
                          <td className="px-4 py-3">
                            {lead.WhatsApp && lead.WhatsApp !== '—' ? (
                              <a href={lead.WhatsApp} target="_blank" rel="noopener" className="text-emerald-400 hover:text-emerald-300 text-xs font-medium transition whitespace-nowrap">
                                💬 {lead.Téléphone}
                              </a>
                            ) : <span className="text-gray-600 text-xs">{lead.Téléphone || '—'}</span>}
                          </td>
                          <td className="px-4 py-3 max-w-[140px]">
                            {lead.Notes && lead.Notes !== '—' ? (
                              <p className="text-gray-500 text-xs truncate cursor-pointer hover:text-gray-300 transition" onClick={() => setSelectedLead(lead)}>{lead.Notes}</p>
                            ) : (
                              <button onClick={() => setSelectedLead(lead)} className="text-gray-700 hover:text-gray-500 text-xs transition opacity-0 group-hover:opacity-100">+ Note</button>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <select value={lead.Statut || 'Nouveau'} onChange={e => updateLeadStatus(lead.ID, e.target.value)} disabled={updatingId === lead.ID}
                              className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none ${STATUS_STYLE[lead.Statut] || 'bg-gray-700 text-gray-400'}`}>
                              {LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1.5">
                              {lead.WhatsApp && lead.WhatsApp !== '—' && (
                                <a href={lead.WhatsApp} target="_blank" rel="noopener"
                                  className="bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border border-emerald-500/20">WA</a>
                              )}
                              <button onClick={() => setSelectedLead(lead)}
                                className="bg-[#1e1e2a] hover:bg-[#2a2a38] text-gray-400 px-2.5 py-1.5 rounded-lg text-xs transition">✏️</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── KANBAN ────────────────────────────────────────────────── */}
        {!loading && tab === 'leads' && view === 'kanban' && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {LEAD_STATUSES.map(s => (
              <KanbanColumn key={s} status={s} leads={kanbanGroups[s] || []} onSelect={setSelectedLead} />
            ))}
          </div>
        )}

        {/* ── PROJECTS TABLE ────────────────────────────────────────── */}
        {!loading && tab === 'projects' && (
          <div className="bg-[#111116] border border-[#1e1e2a] rounded-2xl overflow-hidden">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 text-gray-600">
                <p className="text-3xl mb-3">🚀</p><p className="text-sm">Aucun projet — créez le premier</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2a]">
                      {['Date','Client','Business','Type','Prix','Livraison','Statut','URL','Portal'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map(proj => (
                      <tr key={proj.ID} className="border-b border-[#1e1e2a]/50 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{proj.Date?.split(' ')[0] || '—'}</td>
                        <td className="px-4 py-3 font-bold text-white">{proj.Client || '—'}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{proj.Business || '—'}</td>
                        <td className="px-4 py-3">
                          <span className="bg-[#1e1e2a] text-gray-400 text-xs px-2 py-1 rounded-full">{proj.Type || '—'}</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-400 text-sm">{proj['Prix (€)'] ? `${proj['Prix (€)']}€` : '—'}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{proj.Livraison || '—'}</td>
                        <td className="px-4 py-3">
                          <select value={proj.Statut || 'Brief'} onChange={e => updateProjectStatus(proj.ID, e.target.value)} disabled={updatingId === proj.ID}
                            className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none ${STATUS_STYLE[proj.Statut] || 'bg-gray-700 text-gray-400'}`}>
                            {PROJECT_STATUSES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {proj.URL && proj.URL !== '—'
                            ? <a href={proj.URL} target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300 text-xs underline transition">Voir →</a>
                            : <span className="text-gray-700 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3"><PortalBtn projectId={proj.ID} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── MODALS ────────────────────────────────────────────────────── */}
      {showAddProject && pw && (
        <AddProjectModal pw={pw} onClose={() => setShowAddProject(false)} onAdded={() => fetchData('projects', pw)} />
      )}
      {selectedLead && pw && (
        <LeadDrawer lead={selectedLead} pw={pw}
          onClose={() => setSelectedLead(null)}
          onSaved={(id, notes) => { setLeads(p => p.map(l => l.ID === id ? { ...l, Notes: notes } : l)); setSelectedLead(null) }}
        />
      )}
      {agentResult && (
        <AgentPanel result={agentResult} onClose={() => setAgentResult(null)} />
      )}
    </div>
  )
}
