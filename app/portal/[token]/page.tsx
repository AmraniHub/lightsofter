'use client'

import { useEffect, useState, useRef } from 'react'

const STATUSES = ['Brief', 'En cours', 'Révision', 'Livré', 'Maintenance']

const STATUS_INFO: Record<string, { emoji: string; label: string; desc: string; color: string }> = {
  Brief:       { emoji: '📋', label: 'Brief reçu',          desc: 'Votre brief a été reçu. Notre équipe analyse votre projet.',         color: 'sky' },
  'En cours':  { emoji: '⚡', label: 'En cours de création', desc: 'Votre site est en cours de développement. On revient vers vous vite.', color: 'orange' },
  Révision:    { emoji: '🔍', label: 'En révision',          desc: 'Votre site est prêt pour révision. Donnez-nous vos retours ci-dessous.',color: 'violet' },
  Livré:       { emoji: '🚀', label: 'Site livré !',          desc: 'Votre site est en ligne. Bienvenue dans le monde du digital !',       color: 'green' },
  Maintenance: { emoji: '🛡️', label: 'Maintenance active',    desc: 'Votre site est suivi et maintenu par notre équipe.',                  color: 'teal' },
  Archivé:     { emoji: '📦', label: 'Archivé',              desc: 'Ce projet est archivé.',                                              color: 'gray' },
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

export default function PortalPage({ params }: { params: { token: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Upload state
  const [message, setMessage]     = useState('')
  const [sending, setSending]     = useState(false)
  const [sent, setSent]           = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded]   = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch(`/api/portal/${params.token}`)
      .then(r => r.json())
      .then(d => {
        if (d.ok) setProject(d.project)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [params.token])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || !project) return
    setSending(true)
    await fetch('/api/portal/upload', {
      method: 'POST',
      body: (() => {
        const f = new FormData()
        f.append('message', message)
        f.append('projectId', project.ID)
        f.append('clientName', project.Client)
        return f
      })(),
    })
    setSending(false)
    setSent(true)
    setMessage('')
    setTimeout(() => setSent(false), 3000)
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !project) return
    setUploading(true)
    setUploaded('')
    const f = new FormData()
    f.append('file', file)
    f.append('projectId', project.ID)
    f.append('clientName', project.Client)
    const res  = await fetch('/api/portal/upload', { method: 'POST', body: f })
    const data = await res.json()
    setUploading(false)
    setUploaded(data.ok ? `✓ ${file.name} envoyé !` : data.error || 'Erreur')
    if (fileRef.current) fileRef.current.value = ''
    setTimeout(() => setUploaded(''), 4000)
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Chargement de votre projet...</p>
        </div>
      </div>
    )
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-xl font-black text-gray-900 mb-2">Projet introuvable</h1>
          <p className="text-gray-500 text-sm">Ce lien est invalide ou a expiré. Contactez-nous sur WhatsApp.</p>
          <a href="https://wa.me/212627716149" className="mt-6 inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition">
            💬 Contacter Lightsofter
          </a>
        </div>
      </div>
    )
  }

  const statusInfo  = STATUS_INFO[project.Statut] || STATUS_INFO['Brief']
  const statusIndex = STATUSES.indexOf(project.Statut)
  const colorMap: Record<string, string> = {
    sky: 'bg-sky-500', orange: 'bg-orange-500', violet: 'bg-violet-500',
    green: 'bg-green-500', teal: 'bg-teal-500', gray: 'bg-gray-400',
  }
  const accentColor = colorMap[statusInfo.color] || 'bg-indigo-500'

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">L</div>
            <span className="font-bold text-gray-900 text-sm">Lightsofter</span>
          </div>
          <a href="https://wa.me/212627716149" target="_blank" rel="noopener"
            className="flex items-center gap-1.5 text-sm text-green-600 font-semibold hover:text-green-500 transition">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Hero card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Votre projet</p>
          <h1 className="text-2xl font-black text-gray-900">{project.Business || project.Client}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{project.Type} · Ref. {project.ID}</p>

          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-white text-sm font-bold ${accentColor}`}>
            <span>{statusInfo.emoji}</span>
            <span>{statusInfo.label}</span>
          </div>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">{statusInfo.desc}</p>

          {/* Site URL if delivered */}
          {project.URL && project.URL !== '—' && (
            <a href={project.URL} target="_blank" rel="noopener"
              className="mt-4 flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-semibold px-4 py-3 rounded-xl text-sm transition">
              🌐 Voir votre site en ligne →
            </a>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <h2 className="font-black text-gray-900 mb-6">Avancement du projet</h2>
          <div className="space-y-0">
            {STATUSES.map((s, i) => {
              const done    = i < statusIndex
              const current = i === statusIndex
              const info    = STATUS_INFO[s]
              return (
                <div key={s} className="flex gap-4">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all ${
                      done    ? 'bg-green-500 border-green-500 text-white' :
                      current ? `${accentColor} border-transparent text-white` :
                                'bg-gray-100 border-gray-200 text-gray-400'
                    }`}>
                      {done ? '✓' : info.emoji}
                    </div>
                    {i < STATUSES.length - 1 && (
                      <div className={`w-0.5 h-8 mt-1 ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  {/* Label */}
                  <div className="pb-8">
                    <p className={`font-bold text-sm ${current ? 'text-gray-900' : done ? 'text-gray-500' : 'text-gray-300'}`}>
                      {info.label}
                    </p>
                    {current && (
                      <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{info.desc}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project details */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <h2 className="font-black text-gray-900 mb-4">Détails</h2>
          <div className="space-y-3">
            {[
              { label: 'Client',      value: project.Client },
              { label: 'Type',        value: project.Type },
              { label: 'Démarrage',   value: project.Début },
              { label: 'Livraison',   value: project.Livraison !== '—' ? project.Livraison : 'À confirmer' },
              project.Notes && project.Notes !== '—' ? { label: 'Notes', value: project.Notes } : null,
            ].filter(Boolean).map((item) => item && (
              <div key={item.label} className="flex items-start gap-3 text-sm">
                <span className="text-gray-400 min-w-[90px]">{item.label}</span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* File upload */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <h2 className="font-black text-gray-900 mb-1">Envoyer des fichiers</h2>
          <p className="text-gray-400 text-sm mb-5">Logo, photos, documents — max 10 MB par fichier.</p>

          <div
            className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-2xl p-8 text-center cursor-pointer transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" className="hidden" onChange={handleFile}
              accept="image/*,.pdf,.zip,.doc,.docx,.ai,.svg,.png,.jpg,.jpeg" />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Envoi en cours...</p>
              </div>
            ) : uploaded ? (
              <p className="text-green-600 font-semibold text-sm">{uploaded}</p>
            ) : (
              <>
                <div className="text-3xl mb-2">📎</div>
                <p className="text-gray-600 text-sm font-semibold">Cliquez pour choisir un fichier</p>
                <p className="text-gray-400 text-xs mt-1">Images, PDF, ZIP, AI, SVG — max 10 MB</p>
              </>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <h2 className="font-black text-gray-900 mb-1">Laisser un message</h2>
          <p className="text-gray-400 text-sm mb-5">Retours, corrections, questions — on reçoit votre message instantanément.</p>
          <form onSubmit={sendMessage} className="space-y-3">
            <textarea
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Ex: J'aimerais changer la couleur du bouton en bleu marine, et ajouter une section témoignages..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition resize-none"
            />
            <button type="submit" disabled={sending || !message.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition">
              {sending ? 'Envoi...' : sent ? '✓ Message envoyé !' : '📨 Envoyer le message'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center pb-6">
          <p className="text-gray-400 text-xs">
            Une urgence ?{' '}
            <a href="https://wa.me/212627716149" className="text-indigo-500 underline hover:text-indigo-400">
              WhatsApp direct →
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
