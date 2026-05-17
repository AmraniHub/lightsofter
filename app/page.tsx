'use client'

import { ArrowRight, CheckCircle, Star, Zap, Globe, Smartphone, LayoutDashboard, Clock, Shield, Headphones } from 'lucide-react'
import SmartForm from '@/components/SmartForm'
import PortfolioSection from '@/components/PortfolioSection'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import { useT } from '@/components/LangProvider'

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
)

export default function Home() {
  const { t, locale } = useT()

  const serviceIcons = [Globe, Smartphone, LayoutDashboard]
  const serviceDelays = [t.hero.delay1, t.hero.delay2, t.hero.delay3]
  const serviceFroms = ['490€', '990€', '790€']
  const serviceLabels = [t.hero.service1, t.hero.service2, t.hero.service3]

  const stats = [
    { value: '50+', label: t.stats.clients },
    { value: '3j', label: t.stats.delay },
    { value: '98%', label: t.stats.satisfaction },
    { value: '2', label: t.stats.countries },
  ]

  const whys = [
    { icon: Zap, title: t.form.why1_title, desc: t.form.why1_desc },
    { icon: Shield, title: t.form.why2_title, desc: t.form.why2_desc },
    { icon: Headphones, title: t.form.why3_title, desc: t.form.why3_desc },
    { icon: Clock, title: t.form.why4_title, desc: t.form.why4_desc },
  ]

  const testimonials = [
    { name: 'Marie L.', role: locale === 'en' ? 'Restaurant owner' : 'Restauratrice', city: 'Paris 🇫🇷', text: locale === 'en' ? 'Site delivered in 4 days. Since then, our online bookings have exploded. Ultra-responsive team.' : 'Site livré en 4 jours. Depuis, nos réservations en ligne ont explosé. Équipe ultra réactive.', rating: 5 },
    { name: 'Thomas D.', role: locale === 'en' ? 'Pharmacist' : 'Pharmacien', city: 'Bruxelles 🇧🇪', text: locale === 'en' ? 'Our Android app transformed how we manage prescriptions. Results far beyond expectations.' : 'Notre app Android a transformé notre gestion des ordonnances. Résultat bien au-delà de nos attentes.', rating: 5 },
    { name: 'Sophie M.', role: locale === 'en' ? 'Notary' : 'Notaire', city: 'Lyon 🇫🇷', text: locale === 'en' ? 'Brief understood first time, fast revisions. Our firm finally has a proper online presence.' : 'Brief compris du premier coup, révisions rapides. Cabinet enfin présent sur le web de façon pro.', rating: 5 },
  ]

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0d0720]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/20 rounded-full blur-[140px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-sm">{t.hero.badge}</span>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
                  {t.hero.h1a}<br />
                  <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                    {t.hero.h1b}
                  </span>
                  <br />
                  {t.hero.h1c}{' '}
                  <span className="relative">
                    <span className="relative z-10">{t.hero.days}</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-purple-600/40 rounded-full -z-0" />
                  </span>
                </h1>
                <p className="text-lg text-white/50 leading-relaxed max-w-lg mt-4"
                  dangerouslySetInnerHTML={{ __html: t.hero.sub.replace(/<b>/g, '<span class="text-white/80 font-medium">').replace(/<\/b>/g, '</span>') }}
                />
              </div>

              <div className="flex flex-col gap-2">
                {[t.hero.check1, t.hero.check2, t.hero.check3].map(c => (
                  <div key={c} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {c}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#devis" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-2xl shadow-purple-900/50 hover:-translate-y-0.5">
                  {t.hero.cta_primary} <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#realisations" className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-7 py-4 rounded-2xl transition-all backdrop-blur-sm">
                  {t.hero.cta_secondary}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {['#7c3aed','#6d28d9','#5b21b6','#4c1d95'].map((bg, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0d0720] flex items-center justify-center text-xs font-bold text-white" style={{ background: bg }}>
                      {['M','T','S','J'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-white/40 text-xs mt-0.5">{t.hero.social}</p>
                </div>
              </div>
            </div>

            {/* Right — service cards */}
            <div className="hidden lg:flex flex-col gap-4">
              {serviceIcons.map((Icon, i) => (
                <div key={i} className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-5 hover:border-purple-500/30 transition-all duration-300 cursor-default ${i === 1 ? 'translate-x-6' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{serviceLabels[i]}</p>
                    <p className="text-white/40 text-xs mt-0.5">{serviceDelays[i]} · {serviceFroms[i]}</p>
                  </div>
                  <div className="bg-purple-600/20 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-500/20">{serviceDelays[i]}</div>
                </div>
              ))}
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-5 flex items-center gap-4 shadow-2xl shadow-purple-900/50">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-white font-black text-lg">{t.hero.faster}</p>
                  <p className="text-white/70 text-xs">{t.hero.faster_sub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════════════ */}
      <section className="bg-purple-700 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-black text-white">{s.value}</p>
              <p className="text-purple-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SMART FORM ════════════════════════════════════════════════ */}
      <section id="devis" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  {t.form.badge}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  {t.form.title}<span className="text-purple-700">.</span>
                </h2>
                <p className="text-lg text-gray-500 mt-4 leading-relaxed">{t.form.subtitle}</p>
              </div>

              <div className="space-y-4">
                {whys.map(w => (
                  <div key={w.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <w.icon className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{w.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-gray-600 text-sm italic leading-relaxed">{t.form.trust_quote}</p>
                <p className="text-gray-400 text-xs mt-2 font-medium">{t.form.trust_author}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/80 p-8 md:p-10">
              <SmartForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO ════════════════════════════════════════════════ */}
      <div id="realisations"><PortfolioSection /></div>

      {/* ══ PRICING ══════════════════════════════════════════════════ */}
      <div id="tarifs"><Pricing /></div>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════ */}
      <section id="temoignages" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">{t.testimonials.badge}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(item => (
              <div key={item.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-0.5 mb-4">{[...Array(item.rating)].map((_,i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-6">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">{item.name[0]}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.role} · {item.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-violet-800 rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-sm">{t.cta.badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t.cta.title}</h2>
              <p className="text-purple-200 text-lg mb-10 max-w-xl mx-auto">{t.cta.sub}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#devis" className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl hover:bg-purple-50 transition-all shadow-xl hover:-translate-y-0.5">
                  {t.cta.btn_primary} <ArrowRight className="w-5 h-5" />
                </a>
                <a href="https://wa.me/212627716149?text=Bonjour" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all">
                  {WA_ICON} {t.cta.btn_wa}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
