'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const filters = ['Tous', 'Site Web', 'App Android', 'App Web']

const projects = [
  {
    title: 'Restaurant Le Provençal',
    category: 'Site Web',
    location: 'Paris, France',
    result: '+40% réservations en ligne',
    color: 'from-orange-400 to-red-500',
    icon: '🍽️',
  },
  {
    title: 'Pharmacie Dubois',
    category: 'App Android',
    location: 'Bruxelles, Belgique',
    result: 'Ordonnances 100% numérisées',
    color: 'from-green-400 to-teal-500',
    icon: '💊',
  },
  {
    title: 'Cabinet Notarial Martin',
    category: 'Site Web',
    location: 'Lyon, France',
    result: '+60% contacts entrants',
    color: 'from-blue-400 to-indigo-500',
    icon: '⚖️',
  },
  {
    title: 'Garage Automobile Peugeot',
    category: 'App Web',
    location: 'Lille, France',
    result: 'Gestion RDV automatisée',
    color: 'from-gray-500 to-gray-700',
    icon: '🚗',
  },
  {
    title: 'Boutique Mode Élégance',
    category: 'Site Web',
    location: 'Bordeaux, France',
    result: 'E-commerce lancé en 5 jours',
    color: 'from-pink-400 to-rose-500',
    icon: '👗',
  },
  {
    title: 'Agence Immobilière IMMO+',
    category: 'App Web',
    location: 'Liège, Belgique',
    result: 'Catalogue 500 biens digitalisé',
    color: 'from-purple-400 to-violet-600',
    icon: '🏠',
  },
]

export default function Portfolio() {
  const [active, setActive] = useState('Tous')

  const filtered = active === 'Tous' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Nos réalisations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Ce qu&apos;on a construit
          </h2>
          <p className="text-lg text-gray-500">
            Des projets réels, des résultats mesurables pour nos clients en France et Belgique.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="card-hover group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm"
            >
              {/* Visual */}
              <div className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-6xl">{p.icon}</span>
                {/* Mock browser overlay */}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                  </div>
                  <div className="flex-1 bg-white/30 rounded-md h-4" />
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-3">📍 {p.location}</p>
                <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  <p className="text-sm font-semibold text-green-700">✅ {p.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Démarrer votre projet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
