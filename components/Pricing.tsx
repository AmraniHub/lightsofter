'use client'

import { CheckCircle, Zap, ArrowRight, MessageCircle } from 'lucide-react'
import { useT } from './LangProvider'

const STRIPE_STARTER = process.env.NEXT_PUBLIC_STRIPE_STARTER ?? '/contact'
const STRIPE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRO ?? '/contact'

export default function Pricing() {
  const { t } = useT()

  const plans = [
    {
      name: t.pricing.plan1_name,
      price: '490',
      description: t.pricing.plan1_desc,
      features: [t.pricing.plan1_f1, t.pricing.plan1_f2, t.pricing.plan1_f3, t.pricing.plan1_f4, t.pricing.plan1_f5, t.pricing.plan1_f6, t.pricing.plan1_f7],
      cta: t.pricing.plan1_cta,
      ctaIcon: ArrowRight,
      popular: false,
      stripe: STRIPE_STARTER,
      highlight: false,
    },
    {
      name: t.pricing.plan2_name,
      price: '990',
      description: t.pricing.plan2_desc,
      features: [t.pricing.plan2_f1, t.pricing.plan2_f2, t.pricing.plan2_f3, t.pricing.plan2_f4, t.pricing.plan2_f5, t.pricing.plan2_f6, t.pricing.plan2_f7, t.pricing.plan2_f8],
      cta: t.pricing.plan2_cta,
      ctaIcon: Zap,
      popular: true,
      stripe: STRIPE_PRO,
      highlight: true,
    },
    {
      name: t.pricing.plan3_name,
      price: null,
      description: t.pricing.plan3_desc,
      features: [t.pricing.plan3_f1, t.pricing.plan3_f2, t.pricing.plan3_f3, t.pricing.plan3_f4, t.pricing.plan3_f5, t.pricing.plan3_f6, t.pricing.plan3_f7, t.pricing.plan3_f8],
      cta: t.pricing.plan3_cta,
      ctaIcon: MessageCircle,
      popular: false,
      stripe: 'https://wa.me/212600000000?text=Bonjour',
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">{t.pricing.badge}</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.pricing.title}</h2>
          <p className="text-lg text-gray-500">{t.pricing.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map(p => (
            <div key={p.name} className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 ${p.popular ? 'border-2 border-purple-600 shadow-2xl shadow-purple-500/20 scale-105' : 'border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1'}`}>
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-purple-700 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                    <Zap className="w-3.5 h-3.5 fill-white" />{t.pricing.popular}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-gray-400 text-sm mb-5">{p.description}</p>
                {p.price ? (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black text-gray-900">{p.price}€</span>
                    <span className="text-gray-400 mb-1 text-sm">{t.pricing.per_project}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-black text-gray-900">{t.pricing.on_quote}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.popular ? 'text-purple-600' : 'text-purple-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={p.stripe}
                target={p.name === t.pricing.plan3_name ? '_blank' : undefined}
                rel={p.name === t.pricing.plan3_name ? 'noopener noreferrer' : undefined}
                className={`flex items-center justify-center gap-2 w-full font-bold py-4 rounded-2xl transition-all duration-200 text-sm ${p.popular ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-0.5' : 'border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white'}`}
              >
                <p.ctaIcon className="w-4 h-4" />{p.cta}
              </a>
              {p.price && (
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  {t.pricing.stripe_trust}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-8">{t.pricing.vat_note}</p>
      </div>
    </section>
  )
}
