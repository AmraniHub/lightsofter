'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Combien de temps pour livrer mon site ?',
    a: 'Un site vitrine Starter est livré en 3 à 5 jours ouvrés après validation du brief et du paiement. Les projets Pro prennent 5 à 7 jours. Les applications mobiles et web apps entre 10 et 15 jours selon la complexité.',
  },
  {
    q: 'Est-ce que je peux modifier mon site moi-même après livraison ?',
    a: 'Oui, absolument. Nous vous remettons tous les accès et vous formons à modifier vos contenus (textes, images) de façon autonome. Pour des changements structurels, notre équipe est disponible.',
  },
  {
    q: 'L\'hébergement est-il inclus ?',
    a: 'Oui, l\'hébergement est inclus la première année pour tous nos forfaits. À partir de la 2e année, il est facturé séparément (environ 10–15€/mois selon le trafic).',
  },
  {
    q: 'Vous travaillez aussi avec des clients en Belgique ?',
    a: 'Absolument. Nous travaillons avec des clients en France et en Belgique. Toute la communication se fait à distance (appel vidéo, WhatsApp, email). La facture peut être émise en euros.',
  },
  {
    q: 'Que se passe-t-il si je ne suis pas satisfait ?',
    a: 'Nous proposons des révisions incluses dans chaque forfait. Si après les révisions vous n\'êtes toujours pas satisfait, nous remboursons intégralement. Votre satisfaction est notre priorité.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: '50% d\'acompte au démarrage, 50% à la livraison. Paiement par virement bancaire ou Wise. Pour les projets sur-mesure, un échéancier peut être mis en place.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-500">
            Tout ce que vous voulez savoir avant de commencer.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
