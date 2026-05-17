'use client'

import { useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects, type Project } from '@/lib/projects'
import ProjectModal from './ProjectModal'
import { useT } from './LangProvider'

export default function PortfolioSection() {
  const { t } = useT()
  const filters = [t.portfolio.filter_all, 'Site Web', 'E-commerce', 'App Android', 'App Web']
  const [active, setActive] = useState(filters[0])
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = active === filters[0] ? projects : projects.filter(p => p.type === active)

  return (
    <>
      <section id="realisations" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {t.portfolio.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
              {t.portfolio.title}
            </h2>
            <p className="text-gray-500">{t.portfolio.sub}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === f
                    ? 'bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-700 border border-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <button
                key={p.slug}
                onClick={() => setSelected(p)}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {/* Visual */}
                <div className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {p.emoji}
                    </span>
                  )}

                  {/* Browser chrome top bar */}
                  <div className="absolute top-3 left-3 right-3 bg-white/15 backdrop-blur-sm rounded-xl p-2 flex items-center gap-2 z-10">
                    <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/70" />)}</div>
                    <div className="flex-1 bg-white/30 rounded h-3" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/50 transition-all duration-300 flex items-center justify-center z-20">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-2xl px-5 py-2.5 flex items-center gap-2 text-purple-700 font-bold text-sm shadow-xl">
                      <ExternalLink className="w-4 h-4" />
                      {t.portfolio.filter_all === 'All' ? 'View project' : 'Voir le projet'}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
                      {p.type}
                    </span>
                    {p.real && (
                      <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full px-3 py-1">
                        ✓ Projet réel
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mt-3 mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    📍 {p.city}, {p.country} {p.flag}
                  </p>
                  <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-green-700">✅ {p.result}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="#devis"
              className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
            >
              {t.portfolio.cta} <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
