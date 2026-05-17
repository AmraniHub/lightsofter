'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useT } from './LangProvider'

export default function CTA() {
  const { t } = useT()

  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">{t.cta.badge}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative z-10">{t.cta.title}</h2>
          <p className="text-purple-200 text-lg mb-10 max-w-xl mx-auto relative z-10">{t.cta.sub}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="#devis"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-base"
            >
              {t.cta.btn_primary}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/212627716149?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {t.cta.btn_wa}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
