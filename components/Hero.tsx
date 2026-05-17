'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

const badges = [
  'Livraison en 5 jours',
  'Sans engagement',
  'Support inclus',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200 rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#7e22ce 1px, transparent 1px), linear-gradient(90deg, #7e22ce 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-purple-700 text-sm font-medium">Disponible pour nouveaux projets</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-gray-900">
                Votre site web
                <br />
                <span className="text-gradient">professionnel</span>
                <br />
                en{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">5 jours</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-purple-200 rounded-full -z-0 opacity-60" />
                </span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                Sites web, applications mobiles et web apps pour les PME en{' '}
                <span className="text-gray-700 font-semibold">France</span> et{' '}
                <span className="text-gray-700 font-semibold">Belgique</span>.
                Rapide, pro, au bon prix.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  {b}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 text-base">
                Obtenir mon devis gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/#portfolio" className="btn-secondary flex items-center justify-center gap-2 text-base">
                Voir nos réalisations
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['M', 'S', 'J', 'L'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{
                      background: `hsl(${270 + i * 15}, 60%, ${45 + i * 5}%)`,
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">+50 clients</span> satisfaits en FR & BE
                </p>
              </div>
            </div>
          </div>

          {/* Right — Visual mockup */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative animate-float">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Browser bar */}
                <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-400 border border-gray-200 mx-4">
                    monsite-restaurant.fr
                  </div>
                </div>
                {/* Mock website */}
                <div className="p-6 bg-gradient-to-br from-purple-900 to-purple-700 min-h-[280px]">
                  <div className="space-y-4">
                    <div className="h-3 bg-white/30 rounded-full w-1/2" />
                    <div className="h-8 bg-white/20 rounded-xl w-3/4" />
                    <div className="h-3 bg-white/20 rounded-full w-full" />
                    <div className="h-3 bg-white/20 rounded-full w-4/5" />
                    <div className="flex gap-3 mt-6">
                      <div className="h-10 bg-white rounded-xl w-32" />
                      <div className="h-10 bg-white/20 border border-white/40 rounded-xl w-32" />
                    </div>
                    {/* Grid of cards */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white/10 rounded-xl p-3 space-y-2">
                          <div className="w-8 h-8 bg-white/30 rounded-lg" />
                          <div className="h-2 bg-white/30 rounded w-full" />
                          <div className="h-2 bg-white/20 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Site livré!</p>
                  <p className="text-xs text-gray-500">Restaurant Paris — 4 jours</p>
                </div>
              </div>

              {/* Floating speed card */}
              <div className="absolute -top-6 -right-6 bg-purple-700 rounded-2xl shadow-xl p-4 text-white">
                <p className="text-3xl font-black">5j</p>
                <p className="text-purple-200 text-xs font-medium">délai moyen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
