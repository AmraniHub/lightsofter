'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
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

interface Project {
  ID: string
  Date: string
  Client: string
  Business: string
  Type: string
  Statut: string
  'Prix (€)': string
  Début: string
  Livraison: string
  URL: string
  Notes: string
}

const LEAD_STATUSES    = ['Nouveau','Contacté','Devis envoyé','Client','Perdu']
const PROJECT_STATUSES = ['Brief','En cours','Révision','Livré','Maintenance','Archivé']
const PROJECT_TYPES    = ['Site vitrine','E-commerce','Application Android','Application Web','SEO','Autre']

const STATUS_COLORS: Record<string, string> = {
  Nouveau:       'bg-blue-100 text-blue-700',
  Contacté:      'bg-yellow-100 text-yellow-700',
  'Devis envoyé':'bg-purple-100 text-purple-700',
  Client:        'bg-green-100 text-green-700',
  Perdu:         'bg-red-100 text-red-600',
  Brief:         'bg-sky-100 text-sky-700',
  'En cours':    'bg-orange-100 text-orange-700',
  Révision:      'bg-violet-100 text-violet-700',
  Livré:         'bg-green-100 text-green-700',
  Maintenance:   'bg-teal-100 text-teal-700',
  Archivé:       'bg-gray-100 text-gray-500',
}

const SOURCE_COLORS: Record<string, string> = {
  MonSalonVip:  'bg-pink-100 text-pink-700',
  Lightsofter:  'bg-purple-100 text-purple-700',
  'Meta Ads':   'bg-blue-100 text-blue-700',
  Organic:      'bg-green-100 text-green-700',
  Referral:     'bg-yellow-100 text-yellow-700',
}

// ── Auth screen ───────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }: { onAuth: (p: string) => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/crm?type=leads', {
      headers: { 'x-crm-password': pw },
    })
    if (res.status !== 401) {
      sessionStorage.setItem('crm_pw', pw)
      onAuth(pw)
    } else {
      setErr(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-10 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-2xl font-black text-white">Lightsofter CRM</h1>
          <p className="text-gray-500 text-sm mt-1">Accès réservé</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password" required placeholder="Mot de passe"
            value={pw} onChange={e => { setPw(e.target.value); setErr(false) }}
            className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition"
          />
          {err && <p className="text-red-400 text-sm">Mot de passe incorrect</p>}
          <button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition">
            Accéder au CRM →
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
    e.preventDefault()
    setLoading(true)
    await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-password': pw },
      body: JSON.stringify({ action: 'addProject', ...form }),
    })
    setLoading(false)
    onAdded()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-white">Nouveau projet</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {[
            { label: 'Nom du client *', key: 'client', type: 'text', ph: 'Marie Dupont' },
            { label: 'Nom du business *', key: 'business', type: 'text', ph: 'Salon Éléonore' },
            { label: 'Prix (€)', key: 'price', type: 'number', ph: '490' },
            { label: 'Date de livraison', key: 'dueDate', type: 'date', ph: '' },
            { label: 'URL du site (après livraison)', key: 'url', type: 'url', ph: 'https://...' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
              <input type={f.type} placeholder={f.ph}
                value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Type de projet</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer">
              {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              rows={2} placeholder="Infos importantes..."
              className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>
          <button type="submit" disabled={loading || !form.client || !form.business}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition">
            {loading ? 'Ajout...' : '+ Créer le projet'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Lead Notes Modal ──────────────────────────────────────────────────────────
function LeadNotesModal({ lead, pw, onClose, onSaved }: {
  lead: Lead; pw: string; onClose: () => void; onSaved: (id: string, notes: string) => void
}) {
  const [notes, setNotes] = useState(lead.Notes || '')
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  // Pre-filled WhatsApp first contact message
  const waMsg = `Bonjour ${lead.Nom} 👋\n\nJ'ai bien reçu votre demande${lead.Business && lead.Business !== '—' ? ` pour ${lead.Business}` : ''} — merci !\n\nJe suis [Votre prénom] de ${lead.Source === 'MonSalonVip' ? 'MonSalonVip' : 'Lightsofter'}.\n\nPour préparer votre site, j'ai besoin de quelques infos rapides :\n👉 https://${lead.Source === 'MonSalonVip' ? 'monsalonvip.vercel.app' : 'lightsofter.vercel.app'}/intake\n\nÀ tout de suite ! 💅`

  function copyWA() {
    navigator.clipboard.writeText(waMsg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function save() {
    setSaving(true)
    await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-password': pw },
      body: JSON.stringify({ action: 'updateLead', id: lead.ID, notes }),
    })
    setSaving(false)
    onSaved(lead.ID, notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-black text-lg">{lead.Nom}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{lead.Business} · {lead.Ville} · {lead.Source}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl leading-none">✕</button>
        </div>

        {/* WA message template */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Message WhatsApp — 1er contact</p>
            <button onClick={copyWA}
              className={`text-xs font-semibold px-3 py-1 rounded-lg transition ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
              {copied ? '✓ Copié !' : '📋 Copier'}
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
            {waMsg}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5">Notes internes</label>
          <textarea
            value={notes} onChange={e => setNotes(e.target.value)} rows={4}
            placeholder="Infos importantes, besoins spécifiques, résumé des échanges..."
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition resize-none"
          />
        </div>

        <div className="flex gap-3">
          {lead.WhatsApp && lead.WhatsApp !== '—' && (
            <a href={lead.WhatsApp} target="_blank" rel="noopener"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl text-sm transition">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Ouvrir WhatsApp
            </a>
          )}
          <button onClick={save} disabled={saving}
            className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition">
            {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── CSV Export ────────────────────────────────────────────────────────────────
function exportCSV(leads: Lead[]) {
  const headers = ['ID','Date','Source','Nom','Téléphone','Business','Ville','Secteur','Statut','Notes']
  const rows = leads.map(l => headers.map(h => `"${(l[h as keyof Lead] || '').toString().replace(/"/g,'""')}"`).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `lightsofter-leads-${new Date().toISOString().split('T')[0]}.csv`
  a.click(); URL.revokeObjectURL(url)
}

// ── Main CRM ──────────────────────────────────────────────────────────────────
export default function CRMPage() {
  const [pw, setPw] = useState<string | null>(null)
  const [tab, setTab] = useState<'leads' | 'projects'>('leads')
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
  const [agentResult, setAgentResult] = useState<{
    summary: string
    actions: Array<{
      leadId: string; leadName: string; priority: string
      reason: string; waMessage: string; suggestedStatus: string; autoUpdate: boolean
    }>
    autoUpdated: string[]
    leadsAnalyzed: number
  } | null>(null)
  const [showAgent, setShowAgent] = useState(false)

  // Check session
  useEffect(() => {
    const saved = sessionStorage.getItem('crm_pw')
    if (saved) setPw(saved)
  }, [])

  const fetchData = useCallback(async (type: 'leads' | 'projects', password: string) => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/crm?type=${type}`, { headers: { 'x-crm-password': password } })
      const json = await res.json()
      if (type === 'leads')    setLeads((json.data || []).reverse())
      if (type === 'projects') setProjects((json.data || []).reverse())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (pw) fetchData(tab, pw)
  }, [pw, tab, fetchData])

  async function updateLeadStatus(id: string, status: string) {
    if (!pw) return
    setUpdatingId(id)
    await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-password': pw },
      body: JSON.stringify({ action: 'updateLead', id, status }),
    })
    setLeads(prev => prev.map(l => l.ID === id ? { ...l, Statut: status } : l))
    setUpdatingId(null)
  }

  async function updateProjectStatus(id: string, status: string) {
    if (!pw) return
    setUpdatingId(id)
    await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-crm-password': pw },
      body: JSON.stringify({ action: 'updateProject', id, status }),
    })
    setProjects(prev => prev.map(p => p.ID === id ? { ...p, Statut: status } : p))
    setUpdatingId(null)
  }

  function saveLeadNotes(id: string, notes: string) {
    setLeads(prev => prev.map(l => l.ID === id ? { ...l, Notes: notes } : l))
  }

  async function runAgent() {
    if (!pw) return
    setAgentLoading(true)
    setAgentResult(null)
    try {
      const res = await fetch('/api/crm/agent', {
        method: 'POST',
        headers: { 'x-crm-password': pw },
      })
      const data = await res.json()
      if (data.ok) {
        setAgentResult(data)
        setShowAgent(true)
        // Refresh leads to reflect auto-updates
        if (data.autoUpdated?.length > 0) fetchData('leads', pw)
      }
    } finally {
      setAgentLoading(false)
    }
  }

  if (!pw) return <AuthScreen onAuth={p => setPw(p)} />

  // ── Filter leads ──────────────────────────────────────────────────────────
  const filteredLeads = leads.filter(l => {
    const matchStatus = filterStatus === 'Tous' || l.Statut === filterStatus
    const matchSource = filterSource === 'Tous' || l.Source === filterSource
    const matchSearch = !search || [l.Nom, l.Business, l.Ville, l.Téléphone].join(' ').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSource && matchSearch
  })

  const filteredProjects = projects.filter(p => {
    const matchStatus = filterStatus === 'Tous' || p.Statut === filterStatus
    const matchSearch = !search || [p.Client, p.Business, p.Type].join(' ').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = {
    total:    leads.length,
    nouveau:  leads.filter(l => l.Statut === 'Nouveau').length,
    clients:  leads.filter(l => l.Statut === 'Client').length,
    salons:   leads.filter(l => l.Source === 'MonSalonVip').length,
    revenue:  projects.filter(p => p.Statut !== 'Archivé').reduce((s, p) => s + (parseFloat(p['Prix (€)']) || 0), 0),
    inProgress: projects.filter(p => p.Statut === 'En cours' || p.Statut === 'Brief').length,
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">L</div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">Lightsofter CRM</h1>
              <p className="text-gray-500 text-xs">Dashboard privé</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={runAgent} disabled={agentLoading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-bold text-sm px-4 py-2 rounded-xl transition shadow-lg shadow-purple-900/30">
              {agentLoading ? '⏳ Analyse...' : '🤖 Agent IA'}
            </button>
            <button onClick={() => fetchData(tab, pw)}
              className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 transition">
              ↻ Refresh
            </button>
            <button onClick={() => { sessionStorage.removeItem('crm_pw'); setPw(null) }}
              className="text-gray-500 hover:text-red-400 text-sm transition">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── STATS ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: 'Total leads', value: stats.total, color: 'text-white' },
            { label: 'Nouveaux', value: stats.nouveau, color: 'text-blue-400' },
            { label: 'Clients', value: stats.clients, color: 'text-green-400' },
            { label: 'Salons (MSV)', value: stats.salons, color: 'text-pink-400' },
            { label: 'Projets actifs', value: stats.inProgress, color: 'text-orange-400' },
            { label: 'CA projets', value: `${stats.revenue.toLocaleString('fr-FR')}€`, color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── TABS ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-xl p-1">
            {(['leads', 'projects'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setFilterStatus('Tous'); setSearch('') }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tab === t ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                {t === 'leads' ? `💬 Leads (${leads.length})` : `🚀 Projets (${projects.length})`}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {tab === 'leads' && (
              <button onClick={() => exportCSV(filteredLeads)}
                className="border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium px-4 py-2 rounded-xl text-sm transition">
                ↓ CSV
              </button>
            )}
            {tab === 'projects' && (
              <button onClick={() => setShowAddProject(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition">
                + Nouveau projet
              </button>
            )}
          </div>
        </div>

        {/* ── FILTERS ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition w-48"
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer">
            <option>Tous</option>
            {(tab === 'leads' ? LEAD_STATUSES : PROJECT_STATUSES).map(s => <option key={s}>{s}</option>)}
          </select>
          {tab === 'leads' && (
            <select value={filterSource} onChange={e => setFilterSource(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer">
              <option>Tous</option>
              {['MonSalonVip','Lightsofter','Meta Ads','Organic','Referral'].map(s => <option key={s}>{s}</option>)}
            </select>
          )}
        </div>

        {/* ── LOADING ───────────────────────────────────────────── */}
        {loading && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-3xl animate-pulse mb-2">⏳</div>
            Chargement depuis Google Sheets...
          </div>
        )}

        {/* ── LEADS TABLE ───────────────────────────────────────── */}
        {!loading && tab === 'leads' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3">📭</div>
                <p>Aucun lead trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
                    <tr>
                      {['Date','Source','Nom','Business / Ville','Téléphone','Notes','Statut','Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredLeads.map(lead => (
                      <tr key={lead.ID} className="hover:bg-gray-800/50 transition-colors group">
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{lead.Date?.split(' ')[0] || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${SOURCE_COLORS[lead.Source] || 'bg-gray-700 text-gray-300'}`}>
                            {lead.Source || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-white cursor-pointer hover:text-purple-300 transition"
                          onClick={() => setSelectedLead(lead)}>
                          {lead.Nom || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white text-xs">{lead.Business || '—'}</p>
                          <p className="text-gray-500 text-xs">{lead.Ville || ''}</p>
                        </td>
                        <td className="px-4 py-3">
                          {lead.WhatsApp && lead.WhatsApp !== '—' ? (
                            <a href={lead.WhatsApp} target="_blank" rel="noopener"
                              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition text-xs font-medium">
                              💬 {lead.Téléphone}
                            </a>
                          ) : (
                            <span className="text-gray-500 text-xs">{lead.Téléphone || '—'}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 max-w-[160px]">
                          {lead.Notes && lead.Notes !== '—' ? (
                            <p className="text-gray-400 text-xs truncate cursor-pointer hover:text-white transition"
                              onClick={() => setSelectedLead(lead)} title={lead.Notes}>
                              {lead.Notes}
                            </p>
                          ) : (
                            <button onClick={() => setSelectedLead(lead)}
                              className="text-gray-600 hover:text-gray-400 text-xs transition opacity-0 group-hover:opacity-100">
                              + Ajouter
                            </button>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.Statut || 'Nouveau'}
                            onChange={e => updateLeadStatus(lead.ID, e.target.value)}
                            disabled={updatingId === lead.ID}
                            className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 ${STATUS_COLORS[lead.Statut] || 'bg-gray-700 text-gray-300'}`}
                          >
                            {LEAD_STATUSES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {lead.WhatsApp && lead.WhatsApp !== '—' && (
                              <a href={lead.WhatsApp} target="_blank" rel="noopener"
                                className="bg-green-600 hover:bg-green-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition">
                                WA
                              </a>
                            )}
                            <button onClick={() => setSelectedLead(lead)}
                              className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2.5 py-1.5 rounded-lg text-xs transition">
                              ✏️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── PROJECTS TABLE ────────────────────────────────────── */}
        {!loading && tab === 'projects' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3">🚀</div>
                <p>Aucun projet — créez le premier</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
                    <tr>
                      {['Date','Client','Business','Type','Prix','Livraison','Statut','URL'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredProjects.map(proj => (
                      <tr key={proj.ID} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{proj.Date?.split(' ')[0] || '—'}</td>
                        <td className="px-4 py-3 font-semibold text-white">{proj.Client || '—'}</td>
                        <td className="px-4 py-3 text-gray-300 text-xs">{proj.Business || '—'}</td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{proj.Type || '—'}</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-green-400">{proj['Prix (€)'] ? `${proj['Prix (€)']}€` : '—'}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{proj.Livraison || '—'}</td>
                        <td className="px-4 py-3">
                          <select
                            value={proj.Statut || 'Brief'}
                            onChange={e => updateProjectStatus(proj.ID, e.target.value)}
                            disabled={updatingId === proj.ID}
                            className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 ${STATUS_COLORS[proj.Statut] || 'bg-gray-700 text-gray-300'}`}
                          >
                            {PROJECT_STATUSES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {proj.URL && proj.URL !== '—' ? (
                            <a href={proj.URL} target="_blank" rel="noopener"
                              className="text-purple-400 hover:text-purple-300 text-xs underline transition">
                              Voir →
                            </a>
                          ) : <span className="text-gray-600 text-xs">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {showAddProject && pw && (
        <AddProjectModal pw={pw} onClose={() => setShowAddProject(false)} onAdded={() => fetchData('projects', pw)} />
      )}

      {selectedLead && pw && (
        <LeadNotesModal
          lead={selectedLead}
          pw={pw}
          onClose={() => setSelectedLead(null)}
          onSaved={(id, notes) => { saveLeadNotes(id, notes); setSelectedLead(null) }}
        />
      )}

      {/* ── AI AGENT PANEL ───────────────────────────────────────── */}
      {showAgent && agentResult && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowAgent(false)}>
          <div className="bg-gray-900 border border-purple-800/40 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-lg">🤖</div>
                <div>
                  <h3 className="text-white font-black">Agent IA — Rapport CRM</h3>
                  <p className="text-gray-500 text-xs">{agentResult.leadsAnalyzed} leads analysés</p>
                </div>
              </div>
              <button onClick={() => setShowAgent(false)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            {/* Summary */}
            <div className="bg-purple-950/30 border border-purple-800/30 rounded-2xl p-4 mb-5">
              <p className="text-purple-200 text-sm leading-relaxed">💡 {(agentResult as any).analysis?.summary}</p>
            </div>

            {/* Auto-updated */}
            {agentResult.autoUpdated?.length > 0 && (
              <div className="bg-green-900/20 border border-green-800/30 rounded-xl px-4 py-3 mb-5">
                <p className="text-green-400 text-sm font-semibold">
                  ✅ {agentResult.autoUpdated.length} statut(s) mis à jour automatiquement
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              {(agentResult as any).analysis?.actions?.map((action: any, i: number) => (
                <AgentActionCard key={i} action={action} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Agent Action Card ─────────────────────────────────────────────────────────
function AgentActionCard({ action }: {
  action: {
    leadId: string; leadName: string; priority: string
    reason: string; waMessage: string; suggestedStatus: string; autoUpdate: boolean
  }
}) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(action.waMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const priorityColor = action.priority === 'high'
    ? 'border-red-800/40 bg-red-950/20'
    : action.priority === 'medium'
    ? 'border-yellow-800/40 bg-yellow-950/10'
    : 'border-gray-700 bg-gray-800/30'

  const priorityBadge = action.priority === 'high'
    ? 'bg-red-600/20 text-red-400'
    : action.priority === 'medium'
    ? 'bg-yellow-600/20 text-yellow-400'
    : 'bg-gray-700 text-gray-400'

  return (
    <div className={`border rounded-2xl p-4 space-y-3 ${priorityColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">{action.leadName}</span>
          {action.autoUpdate && (
            <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full">✓ Auto-mis à jour</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityBadge}`}>
            {action.priority === 'high' ? '🚨 Urgent' : action.priority === 'medium' ? '⚠️ Moyen' : '• Bas'}
          </span>
          {action.suggestedStatus && (
            <span className="text-xs text-gray-400">→ <span className="text-white">{action.suggestedStatus}</span></span>
          )}
        </div>
      </div>
      <p className="text-gray-400 text-xs">{action.reason}</p>
      <div className="bg-gray-900/60 rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Message WhatsApp</p>
          <button onClick={copy}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition ${copied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
            {copied ? '✓ Copié' : '📋 Copier'}
          </button>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{action.waMessage}</p>
      </div>
    </div>
  )
}
