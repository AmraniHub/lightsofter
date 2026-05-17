'use client'

import { useEffect } from 'react'
import { X, MapPin, Clock, Calendar, ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { useT } from './LangProvider'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useT()
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  if (!project) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-slide-up">

        {/* Hero banner */}
        <div className={`relative bg-gradient-to-br ${project.color} h-48 flex-shrink-0 flex items-center justify-center overflow-hidden`}>
          {project.image && (
            <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover object-top" />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <span className="text-7xl relative z-10">{project.emoji}</span>

          {/* Browser chrome overlay */}
          <div className="absolute top-4 left-4 right-4 bg-white/15 backdrop-blur-sm rounded-xl p-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              {[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/50" />)}
            </div>
            <div className="flex-1 bg-white/25 rounded-md h-4" />
          </div>

          {/* Type badge */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {project.type}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-7">

          {/* Title block */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">{project.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {project.city}, {project.country} {project.flag}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Livré en {project.duration}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {project.year}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed italic">{project.tagline}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map(m => (
              <div key={m.label} className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
                <p className="text-xl font-black text-purple-700">{m.value}</p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-400 rounded-full" />
              {t.portfolio.modal_problem}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
              {t.portfolio.modal_solution}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{project.solution}</p>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-400 rounded-full" />
              {t.portfolio.modal_stack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(t => (
                <span key={t} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="flex-shrink-0 border-t border-gray-100 p-5 bg-white flex flex-col gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-2xl transition-all"
            >
              <ExternalLink className="w-4 h-4" /> Voir le site en ligne
            </a>
          )}
          <a
            href="#devis"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-500/25 hover:-translate-y-0.5"
          >
            {t.portfolio.modal_cta} <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
