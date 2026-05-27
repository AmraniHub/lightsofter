'use client'

import { useState } from 'react'

const PALETTES = [
  { id: 'dark',    label: 'Sombre & Premium',  preview: ['#0f172a','#6366f1','#e2e8f0'] },
  { id: 'light',   label: 'Clair & Épuré',     preview: ['#ffffff','#3b82f6','#1e293b'] },
  { id: 'luxury',  label: 'Or & Noir',         preview: ['#0a0a0a','#d4a847','#f5f5f5'] },
  { id: 'nature',  label: 'Naturel & Vert',    preview: ['#f0fdf4','#16a34a','#052e16'] },
  { id: 'bold',    label: 'Coloré & Dynamique',preview: ['#7c3aed','#ec4899','#fbbf24'] },
  { id: 'custom',  label: 'Mes propres couleurs', preview: ['#94a3b8','#64748b','#1e293b'] },
]

const SECTORS = [
  'Coiffure / Beauté', 'Restaurant / Food', 'Artisan / BTP',
  'Commerce / Boutique', 'Santé / Bien-être', 'Immobilier',
  'Consultant / Freelance', 'Sport / Coach', 'Mode / Lifestyle',
  'Éducation / Formation', 'Tech / SaaS', 'Autre',
]

const PROJECT_TYPES = [
  { id: 'vitrine',   label: 'Site vitrine',        emoji: '🏠', desc: 'Présenter votre activité' },
  { id: 'ecommerce', label: 'E-commerce',           emoji: '🛒', desc: 'Vendre en ligne' },
  { id: 'landing',   label: 'Landing page',         emoji: '🎯', desc: 'Capturer des leads / vendre' },
  { id: 'refonte',   label: 'Refonte de site',      emoji: '♻️', desc: 'Moderniser un site existant' },
  { id: 'booking',   label: 'Site avec réservation',emoji: '📅', desc: 'Prises de RDV en ligne' },
  { id: 'other',     label: 'Autre',                emoji: '💡', desc: 'Projet sur-mesure' },
]

const BUDGETS = ['< 500 €', '500 – 1 000 €', '1 000 – 2 000 €', '+ 2 000 €', 'Sur devis']
const DEADLINES = ['Urgent (< 1 semaine)', '2 – 4 semaines', '1 – 2 mois', 'Flexible']

interface ServiceRow { name: string; price: string }

interface FormData {
  // Identity
  ownerName: string
  company: string
  sector: string
  city: string
  phone: string
  email: string
  existingUrl: string
  // Project
  projectType: string
  projectDesc: string
  budget: string
  deadline: string
  // Design
  palette: string
  customColors: string
  style: string
  hasLogo: string
  hasPhotos: string
  // Content
  services: ServiceRow[]
  aboutText: string
  domain: string
  instagram: string
  facebook: string
  linkedin: string
  googleMaps: string
  extraNote: string
}

const EMPTY: FormData = {
  ownerName: '', company: '', sector: '', city: '', phone: '', email: '', existingUrl: '',
  projectType: '', projectDesc: '', budget: '', deadline: '',
  palette: '', customColors: '', style: '', hasLogo: '', hasPhotos: '',
  services: [{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }],
  aboutText: '', domain: '', instagram: '', facebook: '', linkedin: '', googleMaps: '',
  extraNote: '',
}

const INPUT = 'w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition'

export default function IntakePage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const TOTAL = 5

  function set(k: keyof FormData, v: string) {
    setForm(p => ({ ...p, [k]: v }))
  }

  function setService(i: number, f: 'name' | 'price', v: string) {
    setForm(p => {
      const s = [...p.services]; s[i] = { ...s[i], [f]: v }; return { ...p, services: s }
    })
  }

  function addService() {
    setForm(p => ({ ...p, services: [...p.services, { name: '', price: '' }] }))
  }

  function removeService(i: number) {
    setForm(p => ({ ...p, services: p.services.filter((_, idx) => idx !== i) }))
  }

  function next() {
    setError('')
    if (step === 1 && (!form.ownerName || !form.company || !form.phone || !form.email)) {
      setError('Merci de remplir les champs obligatoires (*).')
      return
    }
    if (step === 2 && !form.projectType) {
      setError('Merci de choisir un type de projet.')
      return
    }
    if (step === 3 && !form.palette) {
      setError('Merci de choisir une palette de couleurs.')
      return
    }
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function prev() {
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'Lightsofter',
          services: JSON.stringify(form.services.filter(s => s.name)),
          submittedAt: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        }),
      })
    } catch (_) {}
    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#080c14]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl">
            🚀
          </div>
          <h1 className="text-3xl font-black text-white mb-3">
            C&apos;est parti, {form.ownerName} !
          </h1>
          <p className="text-indigo-300 text-lg mb-6">
            Votre brief pour <span className="text-white font-bold">{form.company}</span> a bien été reçu.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4 mb-8">
            <p className="text-white font-semibold text-sm">🗓 Ce qui se passe maintenant :</p>
            {[
              'Notre équipe analyse votre brief en détail',
              'Vous recevez une proposition et maquette sous 24h',
              'Dès validation — votre site est en ligne',
            ].map((s, i) => (
              <div key={i} className="flex gap-3 text-sm text-indigo-300">
                <span className="text-indigo-400 font-bold shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Une question ?{' '}
            <a href="https://wa.me/212627716149" className="text-indigo-400 underline hover:text-indigo-300">
              WhatsApp →
            </a>
          </p>
        </div>
      </div>
    )
  }

  const stepLabels = ['Entreprise', 'Projet', 'Design', 'Contenu', 'Résumé']

  return (
    <div className="min-h-screen bg-[#080c14] text-white pb-24">

      {/* Header */}
      <div className="bg-indigo-950/40 border-b border-indigo-900/30 py-4 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-wide">
          ⚡ Lightsofter · Brief de création de site
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-10">

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  i + 1 < step  ? 'bg-indigo-600 border-indigo-600 text-white' :
                  i + 1 === step ? 'bg-transparent border-indigo-500 text-indigo-400' :
                                   'bg-transparent border-gray-700 text-gray-600'
                }`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i + 1 === step ? 'text-indigo-400' : 'text-gray-600'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (TOTAL - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* ── STEP 1 — Entreprise ──────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Votre entreprise 🏢</h2>
              <p className="text-gray-400 text-sm">Parlez-nous de vous — on va tout personnaliser pour votre activité.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Votre prénom *" placeholder="Marc" value={form.ownerName} onChange={v => set('ownerName', v)} />
              <Field label="Nom de l'entreprise *" placeholder="Marc Plomberie" value={form.company} onChange={v => set('company', v)} />
            </div>

            <SelectField label="Secteur d'activité *" value={form.sector} onChange={v => set('sector', v)} options={SECTORS} placeholder="Sélectionnez..." />

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Ville *" placeholder="Lyon" value={form.city} onChange={v => set('city', v)} />
              <Field label="Téléphone *" placeholder="06 12 34 56 78" value={form.phone} onChange={v => set('phone', v)} type="tel" />
            </div>

            <Field label="Email *" placeholder="contact@monentreprise.fr" value={form.email} onChange={v => set('email', v)} type="email" />

            <Field
              label="Site web actuel (si vous en avez un)"
              placeholder="https://monsite.fr — laissez vide sinon"
              value={form.existingUrl}
              onChange={v => set('existingUrl', v)}
            />
          </div>
        )}

        {/* ── STEP 2 — Projet ─────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Votre projet 🎯</h2>
              <p className="text-gray-400 text-sm">Quel type de site vous faut-il ?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROJECT_TYPES.map(t => (
                <button
                  key={t.id} type="button"
                  onClick={() => set('projectType', t.id)}
                  className={`rounded-2xl p-4 border-2 text-left transition-all ${
                    form.projectType === t.id
                      ? 'border-indigo-500 bg-indigo-950/40'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <p className="text-white text-xs font-bold leading-tight">{t.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Décrivez votre projet en quelques mots (optionnel)
              </label>
              <textarea
                rows={3}
                className={INPUT + ' resize-none'}
                placeholder="Ex: Je veux un site pour présenter mes services de plomberie à Lyon, avec un formulaire de contact et mes avis Google..."
                value={form.projectDesc}
                onChange={e => set('projectDesc', e.target.value)}
              />
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Budget estimé</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map(b => (
                  <button
                    key={b} type="button"
                    onClick={() => set('budget', b)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      form.budget === b
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >{b}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Délai souhaité</p>
              <div className="flex flex-wrap gap-2">
                {DEADLINES.map(d => (
                  <button
                    key={d} type="button"
                    onClick={() => set('deadline', d)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      form.deadline === d
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >{d}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Design ─────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Identité visuelle 🎨</h2>
              <p className="text-gray-400 text-sm">On adapte entièrement votre site à vos couleurs et votre style.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PALETTES.map(p => (
                <button
                  key={p.id} type="button"
                  onClick={() => set('palette', p.id)}
                  className={`rounded-2xl p-4 border-2 text-left transition-all ${
                    form.palette === p.id
                      ? 'border-indigo-500 bg-indigo-950/40'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex gap-1.5 mb-3">
                    {p.preview.map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white/10" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="text-white text-xs font-semibold">{p.label}</p>
                </button>
              ))}
            </div>

            {form.palette === 'custom' && (
              <Field
                label="Décrivez vos couleurs ou partagez vos codes hex"
                placeholder="Ex: bleu marine #1a2b5f + orange #f97316 — ou envoyez votre charte par WhatsApp"
                value={form.customColors}
                onChange={v => set('customColors', v)}
              />
            )}

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Style général</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'minimal',  label: 'Minimaliste & épuré', emoji: '◾' },
                  { id: 'moderne',  label: 'Moderne & tech',      emoji: '⚡' },
                  { id: 'classique',label: 'Classique & sérieux', emoji: '🏛️' },
                  { id: 'dynamique',label: 'Dynamique & audacieux',emoji: '🔥' },
                ].map(s => (
                  <button
                    key={s.id} type="button"
                    onClick={() => set('style', s.id)}
                    className={`rounded-xl px-4 py-3 border-2 text-left transition-all ${
                      form.style === s.id
                        ? 'border-indigo-500 bg-indigo-950/40 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <span className="text-xl mr-2">{s.emoji}</span>
                    <span className="text-sm font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Avez-vous un logo ?</p>
              <div className="space-y-2">
                {[
                  { id: 'yes-send',  label: 'Oui — je l\'envoie par WhatsApp après ce formulaire' },
                  { id: 'yes-later', label: 'Oui — je l\'envoie plus tard' },
                  { id: 'no',        label: 'Non — créez-moi un logo simple' },
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-3 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-500/50 transition">
                    <input type="radio" name="hasLogo" value={opt.id} checked={form.hasLogo === opt.id} onChange={() => set('hasLogo', opt.id)} className="accent-indigo-500" />
                    <span className="text-gray-300 text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Avez-vous des photos professionnelles ?</p>
              <div className="space-y-2">
                {[
                  { id: 'yes-send',  label: 'Oui — je les envoie par WhatsApp' },
                  { id: 'yes-later', label: 'Oui — je les envoie plus tard' },
                  { id: 'no',        label: 'Non — utilisez des images professionnelles (stock)' },
                ].map(opt => (
                  <label key={opt.id} className="flex items-center gap-3 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-500/50 transition">
                    <input type="radio" name="hasPhotos" value={opt.id} checked={form.hasPhotos === opt.id} onChange={() => set('hasPhotos', opt.id)} className="accent-indigo-500" />
                    <span className="text-gray-300 text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
              {form.hasPhotos === 'yes-send' && (
                <div className="mt-3 bg-green-900/20 border border-green-800/30 rounded-xl p-3 text-sm text-green-300">
                  📲 Envoyez vos photos sur WhatsApp : <strong>+212 627 716 149</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 4 — Contenu ────────────────────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Votre contenu 📝</h2>
              <p className="text-gray-400 text-sm">Ces infos seront directement sur votre site — on s'occupe de la rédaction si besoin.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Présentez votre activité (optionnel)
              </label>
              <textarea
                rows={4}
                className={INPUT + ' resize-none'}
                placeholder="Ex: Plombier professionnel à Lyon depuis 2010, spécialisé dans les urgences et les rénovations complètes..."
                value={form.aboutText}
                onChange={e => set('aboutText', e.target.value)}
              />
              <p className="text-gray-600 text-xs mt-1">Si vide, on rédige un texte professionnel optimisé SEO pour vous ✍️</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Vos services / prestations</p>
              <div className="space-y-3">
                {form.services.map((svc, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input className={INPUT} placeholder={`Service ${i + 1} (ex: Dépannage urgent)`} value={svc.name} onChange={e => setService(i, 'name', e.target.value)} />
                      <input className={INPUT} placeholder="Tarif (ex: à partir de 80€)" value={svc.price} onChange={e => setService(i, 'price', e.target.value)} />
                    </div>
                    {form.services.length > 1 && (
                      <button type="button" onClick={() => removeService(i)} className="text-gray-600 hover:text-red-400 transition text-lg shrink-0">×</button>
                    )}
                  </div>
                ))}
              </div>
              {form.services.length < 10 && (
                <button type="button" onClick={addService} className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition">
                  + Ajouter un service
                </button>
              )}
            </div>

            <Field
              label="Nom de domaine souhaité (optionnel)"
              placeholder="Ex: marcplomberie.fr — ou laissez vide si vous ne savez pas encore"
              value={form.domain}
              onChange={v => set('domain', v)}
            />

            <div>
              <p className="text-gray-400 text-sm font-medium mb-3">Vos liens en ligne (optionnels)</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="📸 Instagram" placeholder="@monentreprise" value={form.instagram} onChange={v => set('instagram', v)} />
                <Field label="👤 Facebook" placeholder="https://facebook.com/..." value={form.facebook} onChange={v => set('facebook', v)} />
                <Field label="💼 LinkedIn" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={v => set('linkedin', v)} />
                <Field label="📍 Google Maps" placeholder="Lien vers votre fiche Google" value={form.googleMaps} onChange={v => set('googleMaps', v)} />
              </div>
            </div>

            <Field
              label="Informations supplémentaires"
              placeholder="Ex: Je veux absolument un formulaire de devis, un chat WhatsApp, une section avis Google..."
              value={form.extraNote}
              onChange={v => set('extraNote', v)}
            />
          </div>
        )}

        {/* ── STEP 5 — Résumé ─────────────────────────────────────────────────── */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Tout est bon ? ✅</h2>
              <p className="text-gray-400 text-sm">Vérifiez vos informations avant d'envoyer le brief.</p>
            </div>

            <div className="space-y-4">
              <SummaryBlock title="Votre entreprise" items={[
                ['Prénom', form.ownerName],
                ['Entreprise', form.company],
                ['Secteur', form.sector],
                ['Ville', form.city],
                ['Téléphone', form.phone],
                ['Email', form.email],
                form.existingUrl ? ['Site actuel', form.existingUrl] : null,
              ].filter(Boolean) as [string,string][]} />

              <SummaryBlock title="Projet" items={[
                ['Type', PROJECT_TYPES.find(t => t.id === form.projectType)?.label || '—'],
                form.budget ? ['Budget', form.budget] : null,
                form.deadline ? ['Délai', form.deadline] : null,
              ].filter(Boolean) as [string,string][]} />

              <SummaryBlock title="Design" items={[
                ['Palette', PALETTES.find(p => p.id === form.palette)?.label || '—'],
                form.style ? ['Style', form.style] : null,
                form.hasLogo ? ['Logo', form.hasLogo] : null,
                form.hasPhotos ? ['Photos', form.hasPhotos] : null,
              ].filter(Boolean) as [string,string][]} />

              {form.services.filter(s => s.name).length > 0 && (
                <SummaryBlock title="Services" items={
                  form.services.filter(s => s.name).map(s => [s.name, s.price || '—'] as [string,string])
                } />
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-indigo-900/40 disabled:opacity-60 transition"
            >
              {loading ? 'Envoi en cours...' : '🚀 Envoyer mon brief'}
            </button>

            <p className="text-center text-gray-600 text-xs">
              Vos données sont confidentielles et ne seront jamais partagées.
            </p>
          </form>
        )}

        {/* Navigation */}
        {step < TOTAL && (
          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button type="button" onClick={prev} className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition text-sm font-medium">
                ← Précédent
              </button>
            )}
            <button type="button" onClick={next} className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition text-sm shadow-lg shadow-indigo-900/30">
              {step === TOTAL - 1 ? 'Vérifier →' : 'Continuer →'}
            </button>
          </div>
        )}
        {step > 1 && step === TOTAL && (
          <button type="button" onClick={prev} className="mt-4 w-full py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition text-sm font-medium">
            ← Modifier mes informations
          </button>
        )}

      </div>
    </div>
  )
}

// ── Components ────────────────────────────────────────────────────────────────

function Field({ label, placeholder, value, onChange, type = 'text' }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={INPUT} />
    </div>
  )
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className={INPUT + ' cursor-pointer'}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function SummaryBlock({ title, items }: { title: string; items: [string, string][] }) {
  if (!items.length) return null
  return (
    <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-5">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">{title}</p>
      <div className="space-y-2">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-start gap-2 text-sm">
            <span className="text-gray-500 min-w-[110px] flex-shrink-0">{k}</span>
            <span className="text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
