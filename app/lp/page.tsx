'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const SECTORS = [
  'Restaurant / Bar / Café',
  'Coiffeur / Esthétique / Beauté',
  'Artisan (plombier, électricien…)',
  'Commerce / Boutique',
  'Cabinet médical / Para-médical',
  'Immobilier / Agence',
  'Coach / Consultant / Formateur',
  'Avocat / Notaire / Expert-comptable',
  'Garage / Auto',
  'Hôtel / Chambre d\'hôtes',
  'Association / ONG',
  'Autre activité',
]

const CLIENTS = [
  {
    name: 'AiRideBox',
    desc: 'Boîtier IA pour véhicules',
    url: 'https://airidebox.com',
    img: 'https://image.thum.io/get/width/600/crop/400/https://airidebox.com',
  },
  {
    name: 'Trendimora',
    desc: 'E-commerce mode UK',
    url: 'https://trendimora.com',
    img: 'https://image.thum.io/get/width/600/crop/400/https://trendimora.com',
  },
  {
    name: 'Concepteur Bois',
    desc: 'Mobilier premium Maroc',
    url: 'https://concepteurbois.ma',
    img: 'https://image.thum.io/get/width/600/crop/400/https://concepteurbois.ma',
  },
]

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', phone: '', sector: '', country: 'FR' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  // Read fbp / fbc from cookies for CAPI EMQ
  function getCookie(name: string) {
    if (typeof document === 'undefined') return ''
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.sector) {
      setError('Merci de remplir tous les champs.')
      return
    }
    setError('')
    setLoading(true)

    const eventId = 'lp_lead_' + Date.now()

    try {
      await fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Lead',
          eventId,
          sourceUrl: window.location.href,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc') || new URLSearchParams(window.location.search).get('fbclid') || '',
          telephone: form.phone,
          name: form.name,
          country: form.country,
          projectType: form.sector,
        }),
      })
    } catch (_) {
      // CAPI failure is silent — lead is still captured
    }

    // Also notify Telegram via existing contact API
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          company: form.sector,
          message: `🎯 LEAD META ADS\nSecteur: ${form.sector}\nPays: ${form.country}`,
          source: 'Landing Page Meta Ads',
        }),
      })
    } catch (_) {}

    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Animated checkmark */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-900/40">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Demande reçue ✅</h1>
          <p className="text-gray-400 text-lg mb-2">
            Merci <span className="text-white font-semibold">{form.name}</span> !
          </p>

          {/* Instant contact badge */}
          <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/40 rounded-full px-4 py-2 text-green-400 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Notre équipe vous contacte dans les prochaines minutes
          </div>

          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Vous serez contacté sur le <span className="text-white font-bold">{form.phone}</span> — restez disponible.<br/>
            <span className="text-purple-400 font-semibold">Votre site sera en ligne dans 24h</span> après validation.
          </p>

          <div className="bg-purple-900/20 border border-purple-700/30 rounded-2xl p-5 text-left space-y-4">
            <p className="text-white font-bold text-sm">🚀 Ce qui se passe maintenant :</p>
            {[
              { n: '1', icon: '💬', text: 'Notre équipe vous contacte instantanément par WhatsApp ou téléphone' },
              { n: '2', icon: '🎨', text: 'On prépare votre maquette et vous envoyons un devis précis (prix fixe)' },
              { n: '3', icon: '⚡', text: 'Dès votre validation — votre site est en ligne en 24h chrono' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3 text-sm">
                <span className="text-purple-400 font-black mt-0.5 w-4 shrink-0">{s.n}.</span>
                <span className="text-gray-300">{s.icon} {s.text}</span>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/212627716149?text=Bonjour, je viens de soumettre ma demande (${form.name})`}
            target="_blank" rel="noopener"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl text-sm transition">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Nous écrire sur WhatsApp maintenant
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="bg-purple-700 text-white text-center text-sm py-2 px-4 font-medium">
        🔥 Offre limitée — Site professionnel livré en <strong>24h</strong> à partir de <strong>490€</strong>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 lg:pt-20 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-600/40 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Disponible pour de nouveaux projets
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Votre site web pro<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                livré en 24h
              </span>
              <br />à partir de 490€
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Les agences classiques : <span className="line-through text-gray-600">3 mois · 4 000€+</span><br />
              Lightsofter : <span className="text-white font-semibold">24 heures · 490€</span> — sans compromis sur la qualité.
            </p>

            {/* Trust points */}
            <ul className="space-y-2.5 mb-8">
              {[
                '⚡ Votre site en ligne en 24h — garanti',
                '💬 Notre équipe vous contacte instantanément après votre demande',
                '✅ Prix fixe dès le départ — aucune surprise',
                '✅ SEO de base inclus',
                '✅ Support WhatsApp inclus après livraison',
              ].map(item => (
                <li key={item} className="text-gray-300 text-sm flex items-start gap-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['👨‍💼','👩‍💼','🧑‍🍳','👨‍🔧','👩‍⚕️'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-purple-800 border-2 border-gray-950 flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">+50 PME</span> en France, Belgique, Suisse et Monaco nous font confiance
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            <div className="bg-gray-900 border border-gray-700/60 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-1">Devis gratuit</p>
                <h2 className="text-2xl font-black text-white">Recevez votre devis en 24h</h2>
                <p className="text-gray-500 text-sm mt-1">Sans engagement · Réponse garantie</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Votre prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marc"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Votre téléphone *</label>
                  <div className="flex gap-2">
                    <select
                      value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      className="bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer"
                    >
                      <option value="FR">🇫🇷 +33</option>
                      <option value="BE">🇧🇪 +32</option>
                      <option value="CH">🇨🇭 +41</option>
                      <option value="MC">🇲🇨 +377</option>
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Votre secteur d'activité *</label>
                  <select
                    required
                    value={form.sector}
                    onChange={e => setForm({ ...form, sector: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition cursor-pointer"
                  >
                    <option value="">Choisissez votre secteur...</option>
                    {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/40"
                >
                  {loading ? 'Envoi en cours...' : '🚀 Recevoir mon devis gratuit →'}
                </button>

                <p className="text-center text-gray-600 text-xs">
                  🔒 Vos données sont confidentielles · Aucun spam
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON BAR ──────────────────────────────────────────────── */}
      <section className="border-y border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-black text-purple-400">24h</p>
              <p className="text-gray-400 text-sm">Délai de livraison</p>
            </div>
            <div className="space-y-1 border-x border-gray-800">
              <p className="text-3xl font-black text-purple-400">490€</p>
              <p className="text-gray-400 text-sm">Prix de départ</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-purple-400">+50</p>
              <p className="text-gray-400 text-sm">Clients livrés</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT SITES ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest font-semibold mb-2">Sites livrés</p>
        <h2 className="text-center text-2xl font-black text-white mb-10">
          Voici ce qu'on livre en 24h
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CLIENTS.map(c => (
            <div key={c.name} className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300">
              <div className="relative h-44 bg-gray-800 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs bg-green-500 text-white font-semibold px-2 py-0.5 rounded-full">
                  ✓ Projet réel
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold text-white">{c.name}</p>
                <p className="text-gray-500 text-sm">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="bg-gray-900/50 border-y border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-2xl font-black text-white mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Vous remplissez le formulaire', desc: 'Prénom, téléphone et secteur. 30 secondes. On prépare votre devis sur mesure.', time: 'Maintenant' },
              { step: '2', title: 'On vous envoie un devis', desc: 'Devis personnalisé avec maquette dans les 24h. Prix fixe, aucune surprise.', time: 'Dans 24h' },
              { step: '3', title: 'Votre site est en ligne', desc: 'Dès validation, on livre votre site pro en 24-28h. Vous recevez tous les accès.', time: 'Sous 28h' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-purple-700 rounded-2xl flex items-center justify-center text-white font-black text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">{item.time}</p>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gray-900 border border-gray-700/60 rounded-3xl p-8">
          <p className="text-4xl mb-4">⭐⭐⭐⭐⭐</p>
          <p className="text-white text-lg font-medium italic leading-relaxed mb-6">
            "Site livré en moins de 24h. Exactement ce qu'on cherchait — pro, rapide, et le support WhatsApp est vraiment réactif. Je recommande sans hésiter."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold">M</div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Marie L.</p>
              <p className="text-gray-500 text-xs">Restauratrice · Paris 🇫🇷</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="bg-purple-700 py-14 px-6 text-center">
        <h2 className="text-3xl font-black text-white mb-3">
          Prêt à avoir votre site en 24h ?
        </h2>
        <p className="text-purple-200 mb-8 text-lg">
          Devis gratuit · Prix fixe à partir de 490€ · Livraison sous 24-28h
        </p>
        <button
          onClick={scrollToForm}
          className="bg-white text-purple-700 font-black px-10 py-4 rounded-2xl text-lg hover:bg-purple-50 transition shadow-xl hover:scale-105"
        >
          Je veux mon devis gratuit →
        </button>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="bg-gray-950 border-t border-gray-800 py-6 text-center">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Lightsofter ·{' '}
          <a href="/mentions-legales" className="hover:text-gray-400 transition">Mentions légales</a>
          {' · '}
          <a href="/politique-confidentialite" className="hover:text-gray-400 transition">Confidentialité</a>
        </p>
      </div>

    </div>
  )
}
