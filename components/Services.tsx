'use client'

import Link from 'next/link'
import { Globe, Smartphone, LayoutDashboard, ArrowRight } from 'lucide-react'
import { useT } from './LangProvider'

export default function Services() {
  const { t } = useT()

  const services = [
    {
      icon: Globe,
      title: t.services.s1_title,
      description: t.services.s1_desc,
      features: [t.services.s1_f1, t.services.s1_f2, t.services.s1_f3, t.services.s1_f4],
      delay: t.services.s1_delay,
      color: 'from-purple-500 to-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      icon: Smartphone,
      title: t.services.s2_title,
      description: t.services.s2_desc,
      features: [t.services.s2_f1, t.services.s2_f2, t.services.s2_f3, t.services.s2_f4],
      delay: t.services.s2_delay,
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
    },
    {
      icon: LayoutDashboard,
      title: t.services.s3_title,
      description: t.services.s3_desc,
      features: [t.services.s3_f1, t.services.s3_f2, t.services.s3_f3, t.services.s3_f4],
      delay: t.services.s3_delay,
      color: 'from-fuchsia-500 to-purple-600',
      bg: 'bg-fuchsia-50',
      border: 'border-fuchsia-100',
    },
  ]

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.services.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t.services.title}</h2>
          <p className="text-lg text-gray-500">{t.services.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className={`card-hover rounded-3xl border ${s.border} ${s.bg} p-8 flex flex-col`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 shadow-lg`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block text-xs font-semibold text-purple-700 bg-white border border-purple-200 rounded-full px-3 py-1 mb-4 w-fit">
                {t.services.delay_label} : {s.delay}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{s.description}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="flex items-center gap-2 text-purple-700 font-semibold text-sm hover:gap-3 transition-all">
                {t.services.cta_link} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
