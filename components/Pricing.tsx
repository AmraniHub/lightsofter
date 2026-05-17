import Link from 'next/link'
import { CheckCircle, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '490',
    description: 'Pour lancer votre présence en ligne rapidement.',
    features: [
      'Site vitrine 5 pages',
      'Design professionnel',
      'Mobile responsive',
      'Formulaire de contact',
      'SEO de base',
      'Hébergement 1 an inclus',
      '1 révision',
    ],
    cta: 'Commencer',
    popular: false,
    color: 'border-gray-200',
    ctaStyle: 'btn-secondary',
  },
  {
    name: 'Pro',
    price: '990',
    description: 'La solution complète pour les PME sérieuses.',
    features: [
      'Site jusqu\'à 15 pages',
      'Design premium sur mesure',
      'Mobile & SEO avancé',
      'Blog / Actualités',
      'Google Analytics',
      'Hébergement 1 an inclus',
      '3 révisions',
      'Support 3 mois',
    ],
    cta: 'Choisir Pro',
    popular: true,
    color: 'border-purple-500',
    ctaStyle: 'btn-primary',
  },
  {
    name: 'Sur-mesure',
    price: 'Sur devis',
    description: 'App Android, web app ou projet complexe.',
    features: [
      'Développement 100% custom',
      'Application Android ou web',
      'Base de données & API',
      'Dashboard admin',
      'Intégrations tierces',
      'Hébergement inclus',
      'Révisions illimitées',
      'Support 6 mois',
    ],
    cta: 'Discutons de votre projet',
    popular: false,
    color: 'border-gray-200',
    ctaStyle: 'btn-secondary',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Tarifs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Prix clairs, sans surprises
          </h2>
          <p className="text-lg text-gray-500">
            Pas de frais cachés. Vous savez exactement ce que vous payez avant de commencer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative bg-white rounded-3xl border-2 ${p.color} p-8 card-hover ${
                p.popular ? 'shadow-2xl shadow-purple-500/20 scale-105' : 'shadow-sm'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-purple-700 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{p.description}</p>
                <div className="flex items-end gap-1">
                  {p.price !== 'Sur devis' ? (
                    <>
                      <span className="text-4xl font-black text-gray-900">{p.price}€</span>
                      <span className="text-gray-400 mb-1">/ projet</span>
                    </>
                  ) : (
                    <span className="text-3xl font-black text-gray-900">{p.price}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className={`${p.ctaStyle} block text-center`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          * Tous les tarifs sont HT. TVA applicable selon pays.
        </p>
      </div>
    </section>
  )
}
