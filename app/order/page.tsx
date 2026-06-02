'use client'
import { useState } from 'react'

// ── Payment details — update these with your real info ────────────────────────
const PAYONEER_EMAIL = 'amrani4online@gmail.com'
const PAYONEER_LINK  = 'https://payoneer.com/pay' // Replace with your Payoneer payment link
const PAYPAL_LINK    = 'https://paypal.me/VOTRE_USERNAME' // Replace with your PayPal.me link
const IBAN           = 'FR76 XXXX XXXX XXXX XXXX XXXX XXX' // Replace with your IBAN
const BIC            = 'XXXXXXXX'                           // Replace with your BIC
const BANK_NAME      = 'CIH Bank'
const ACCOUNT_NAME   = 'Abdelali El Amrani'

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
  package: string; maintenance: string; businessName: string; sector: string
  tagline: string; services: string; about: string; colors: string; style: string
  examples: string; firstName: string; lastName: string; email: string
  phone: string; country: string; notes: string; paymentMethod: string
}

const empty: FormData = {
  package: 'essentiel', maintenance: 'none',
  businessName: '', sector: '', tagline: '', services: '', about: '',
  colors: '', style: 'modern', examples: '',
  firstName: '', lastName: '', email: '', phone: '', country: 'FR', notes: '',
  paymentMethod: 'payoneer',
}

export default function OrderPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState('')

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

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
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  // ── Success / Payment instructions ─────────────────────────────────────────
  if (submitted) {
    const total = selectedPkg.price
    return (
      <main className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Commande confirmée ✅</h1>
            <p className="text-gray-500 mt-2">Merci {form.firstName} ! Voici comment finaliser votre paiement.</p>
          </div>

          {/* Payment instructions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Mode de paiement choisi</p>

            {/* Payoneer */}
            {form.paymentMethod === 'payoneer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#FF4800]/10 rounded-xl flex items-center justify-center text-lg">🅿</div>
                  <div>
                    <p className="font-black text-gray-900">Payoneer</p>
                    <p className="text-gray-500 text-xs">Paiement par carte ou virement</p>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-800">Envoyez <span className="text-orange-600 font-black">{total}€</span> à :</p>
                  <div className="flex items-center justify-between bg-white border border-orange-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-mono text-gray-700">{PAYONEER_EMAIL}</span>
                    <button onClick={() => copy(PAYONEER_EMAIL, 'payoneer-email')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${copied === 'payoneer-email' ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}>
                      {copied === 'payoneer-email' ? '✓ Copié' : 'Copier'}
                    </button>
                  </div>
                  <a href={PAYONEER_LINK} target="_blank" rel="noopener"
                    className="flex items-center justify-center gap-2 w-full bg-[#FF4800] hover:bg-[#e03e00] text-white font-bold py-3 rounded-xl text-sm transition">
                    Payer {total}€ via Payoneer →
                  </a>
                </div>
              </div>
            )}

            {/* PayPal */}
            {form.paymentMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#003087]/10 rounded-xl flex items-center justify-center text-lg">🅿️</div>
                  <div>
                    <p className="font-black text-gray-900">PayPal</p>
                    <p className="text-gray-500 text-xs">Paiement en quelques secondes</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-800">Envoyez <span className="text-blue-700 font-black">{total}€</span> via PayPal :</p>
                  <a href={`${PAYPAL_LINK}/${total}`} target="_blank" rel="noopener"
                    className="flex items-center justify-center gap-2 w-full bg-[#003087] hover:bg-[#002266] text-white font-bold py-3 rounded-xl text-sm transition">
                    Payer {total}€ sur PayPal.me →
                  </a>
                  <p className="text-xs text-gray-500 text-center">Utilisez l'option "Paiement pour biens/services" (non "Envoyer à un ami")</p>
                </div>
              </div>
            )}

            {/* IBAN */}
            {form.paymentMethod === 'iban' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-lg">🏦</div>
                  <div>
                    <p className="font-black text-gray-900">Virement bancaire</p>
                    <p className="text-gray-500 text-xs">Traitement sous 1-2 jours ouvrés</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-gray-800">Effectuez un virement de <span className="font-black">{total}€</span> :</p>
                  {[
                    { label: 'Bénéficiaire', value: ACCOUNT_NAME },
                    { label: 'IBAN', value: IBAN },
                    { label: 'BIC/SWIFT', value: BIC },
                    { label: 'Banque', value: BANK_NAME },
                    { label: 'Référence', value: `CMD-${form.firstName.toUpperCase()}-${Date.now().toString(36).toUpperCase()}` },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-mono text-gray-800 font-medium">{item.value}</p>
                      </div>
                      <button onClick={() => copy(item.value, item.label)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition shrink-0 ml-2 ${copied === item.label ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {copied === item.label ? '✓' : 'Copier'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-4">
            <p className="font-bold text-gray-900 text-sm mb-3">🚀 Une fois le paiement envoyé :</p>
            {[
              'Envoyez-nous une capture du paiement par WhatsApp',
              'On démarre votre site immédiatement',
              'Livraison en 24h après confirmation du paiement',
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700 mb-2">
                <span className="text-purple-600 font-black shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/212627716149?text=Bonjour, j'ai passé ma commande pour ${form.businessName} (${total}€ - ${form.paymentMethod}). Je vous envoie la confirmation.`}
            target="_blank" rel="noopener"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl text-sm transition shadow-lg shadow-green-900/20">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Confirmer le paiement par WhatsApp
          </a>
        </div>
      </main>
    )
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

              {/* Payment method */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Mode de paiement</p>
                <div className="space-y-2">
                  {[
                    { id: 'payoneer', label: 'Payoneer', sub: 'Recommandé — rapide et sécurisé', badge: '⭐', color: 'border-orange-400 bg-orange-50' },
                    { id: 'paypal',   label: 'PayPal',   sub: 'Compte personnel PayPal', badge: '', color: 'border-blue-400 bg-blue-50' },
                    { id: 'iban',     label: 'Virement bancaire (IBAN)', sub: '1-2 jours ouvrés', badge: '', color: 'border-gray-300 bg-gray-50' },
                  ].map(m => (
                    <button key={m.id} type="button" onClick={() => set('paymentMethod', m.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${form.paymentMethod === m.id ? m.color : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-gray-800 text-sm">{m.label}</span>
                          {m.badge && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">{m.badge} Recommandé</span>}
                          <p className="text-xs text-gray-500 mt-0.5">{m.sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${form.paymentMethod === m.id ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`} />
                      </div>
                    </button>
                  ))}
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
                {loading
                  ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Traitement...</>
                  : `Confirmer la commande ${selectedPkg.price}€ →`}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Payoneer · PayPal · Virement IBAN · Remboursement sous 7 jours si non livré
        </p>
      </div>
    </main>
  )
}
