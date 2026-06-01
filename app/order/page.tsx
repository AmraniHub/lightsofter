'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SECTORS = [
  'Restaurant / Bar', 'Artisan / Bâtiment', 'Coach / Consultant',
  'Avocat / Notaire', 'Médecin / Santé', 'E-commerce', 'Immobilier',
  'Beauté / Bien-être', 'Association', 'Autre',
]

const STYLES = [
  { id: 'modern', label: 'Moderne & épuré' },
  { id: 'bold', label: 'Audacieux & coloré' },
  { id: 'classic', label: 'Classique & sobre' },
  { id: 'creative', label: 'Créatif & original' },
]

const PACKAGES = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: 490,
    features: ['Site vitrine 5 pages', 'Formulaire de contact', 'SEO de base', 'SSL + hébergement 1 an', 'Livraison 2-3 jours'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 790,
    features: ['Tout Essentiel +', 'Boutique / réservation', 'Blog intégré', 'SEO avancé', 'Animations premium'],
  },
]

const MAINTENANCE = [
  { id: 'none', label: 'Non merci', price: 0 },
  { id: 'basic', label: 'Pack Maintenance — 29€/mois', price: 29, desc: 'Hébergement, domaine, 1 modif/mois' },
  { id: 'pro', label: 'Pack Maintenance Pro — 49€/mois', price: 49, desc: 'Prioritaire, modifs illimitées, rapport SEO' },
]

type FormData = {
  package: string
  maintenance: string
  businessName: string
  sector: string
  tagline: string
  services: string
  about: string
  colors: string
  style: string
  examples: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  notes: string
}

const empty: FormData = {
  package: 'essentiel', maintenance: 'none',
  businessName: '', sector: '', tagline: '', services: '', about: '',
  colors: '', style: 'modern', examples: '',
  firstName: '', lastName: '', email: '', phone: '', country: 'FR', notes: '',
}

export default function OrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const selectedPkg = PACKAGES.find(p => p.id === form.package)!
  const selectedMaint = MAINTENANCE.find(m => m.id === form.maintenance)!

  const canNext = () => {
    if (step === 1) return !!form.package
    if (step === 2) return form.businessName.trim() && form.sector && form.tagline.trim()
    if (step === 3) return form.services.trim() && form.style
    if (step === 4) return form.firstName.trim() && form.email.trim() && form.phone.trim()
    return true
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Erreur lors du paiement.')
        setLoading(false)
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-widest">Commander</span>
          <h1 className="text-3xl font-black text-gray-900 mt-2">Votre site en 2-3 jours</h1>
          <p className="text-gray-500 mt-2">Remplissez ce formulaire — nous nous occupons du reste.</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Formule', 'Votre activité', 'Contenu', 'Contact'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === i + 1 ? 'bg-purple-600 text-white' :
                step > i + 1 ? 'bg-purple-200 text-purple-700' : 'bg-gray-200 text-gray-400'
              }`}>{i + 1}</div>
              {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-purple-300' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Step 1 — Package */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Choisissez votre formule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PACKAGES.map(pkg => (
                  <button key={pkg.id} onClick={() => set('package', pkg.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      form.package === pkg.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-gray-900">{pkg.name}</span>
                      <span className="text-purple-600 font-black text-lg">{pkg.price}€</span>
                    </div>
                    <ul className="space-y-1">
                      {pkg.features.map(f => (
                        <li key={f} className="text-sm text-gray-600 flex items-center gap-1.5">
                          <span className="text-purple-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Ajouter la maintenance ?</p>
                <div className="space-y-2">
                  {MAINTENANCE.map(m => (
                    <button key={m.id} onClick={() => set('maintenance', m.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        form.maintenance === m.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                      }`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{m.label}</span>
                        {m.price > 0 && <span className="text-xs text-gray-400">{m.desc}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 text-sm text-purple-800">
                <strong>Total aujourd'hui :</strong> {selectedPkg.price}€
                {selectedMaint.price > 0 && ` + ${selectedMaint.price}€/mois après livraison`}
              </div>
            </div>
          )}

          {/* Step 2 — Business info */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Votre activité</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de votre entreprise *</label>
                <input value={form.businessName} onChange={e => set('businessName', e.target.value)}
                  placeholder="Ex: Boulangerie Martin" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité *</label>
                <select value={form.sector} onChange={e => set('sector', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Choisir...</option>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phrase d'accroche *</label>
                <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                  placeholder="Ex: Les meilleurs croissants de Lyon depuis 1985" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Style visuel *</label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLES.map(s => (
                    <button key={s.id} onClick={() => set('style', s.id)}
                      className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        form.style === s.id ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'
                      }`}>{s.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Couleurs souhaitées</label>
                <input value={form.colors} onChange={e => set('colors', e.target.value)}
                  placeholder="Ex: bleu marine et or, ou #1A2B3C" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
          )}

          {/* Step 3 — Content */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Contenu de votre site</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vos services / produits *</label>
                <textarea value={form.services} onChange={e => set('services', e.target.value)} rows={3}
                  placeholder="Ex: Baguettes tradition, pâtisseries, viennoiseries, commandes spéciales..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Présentation de votre entreprise</label>
                <textarea value={form.about} onChange={e => set('about', e.target.value)} rows={3}
                  placeholder="Quelques lignes sur votre histoire, vos valeurs, ce qui vous distingue..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sites que vous aimez (inspiration)</label>
                <input value={form.examples} onChange={e => set('examples', e.target.value)}
                  placeholder="Ex: apple.com, airbnb.com — ou décrivez ce que vous aimez" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes supplémentaires</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
                  placeholder="Contraintes, souhaits particuliers, deadline..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>
            </div>
          )}

          {/* Step 4 — Contact + payment */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Vos coordonnées</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    placeholder="Jean" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input value={form.lastName} onChange={e => set('lastName', e.target.value)}
                    placeholder="Dupont" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="jean@exemple.com" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+33 6 12 34 56 78" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                <select value={form.country} onChange={e => set('country', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                  <option value="MC">Monaco</option>
                  <option value="MA">Maroc</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-5 mt-2 space-y-2">
                <p className="font-semibold text-gray-900 text-sm mb-3">Récapitulatif</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Formule {selectedPkg.name}</span>
                  <span className="font-medium">{selectedPkg.price}€</span>
                </div>
                {selectedMaint.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Maintenance (après livraison)</span>
                    <span className="font-medium">{selectedMaint.price}€/mois</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                  <span>À payer maintenant</span>
                  <span className="text-purple-600">{selectedPkg.price}€</span>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition">
                ← Retour
              </button>
            ) : <div />}

            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
                Continuer →
              </button>
            ) : (
              <button onClick={submit} disabled={!canNext() || loading}
                className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-40 flex items-center gap-2">
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Redirection...</>
                ) : 'Payer ' + selectedPkg.price + '€ →'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Paiement sécurisé par Stripe · SSL · Remboursement sous 7 jours si non livré
        </p>
      </div>
    </main>
  )
}
